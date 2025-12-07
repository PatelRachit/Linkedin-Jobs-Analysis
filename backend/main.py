from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import pickle
import re
import spacy

app = FastAPI(title="Job Description Classifier API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load all models at startup
print("Loading models...")
nlp = spacy.load("en_core_web_sm")
with open("role_classifier.pkl", "rb") as f:
    role_classifier = pickle.load(f)
with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)
with open("skill_classifier.pkl", "rb") as f:
    skill_classifier = pickle.load(f)
with open("skill_binarizer.pkl", "rb") as f:
    skill_binarizer = pickle.load(f)
with open("skill_dictionary.pkl", "rb") as f:
    skill_dictionary = pickle.load(f)
print("All models loaded!")

# Request/Response models
class JobRequest(BaseModel):
    description: str

class ExperienceResponse(BaseModel):
    level: str  # "Entry-Level", "Mid-Level", "Senior", "Executive", "Not Specified"
    years_min: Optional[int]
    years_max: Optional[int]

class JobResponse(BaseModel):
    company: Optional[str]
    location: Optional[str]
    experience: ExperienceResponse
    salary: Optional[str]
    job_type: str  # "Full-time", "Part-time", "Internship", "Co-op", "Contract", "Not Specified"
    skills_extracted: list
    role_category: str
    role_confidence: float
    predicted_top_skills: list
    h1b_sponsorship: str  # "Yes", "No", or "Not Mentioned"

# NLP extraction functions
def extract_company_ner(text):
    doc = nlp(text[:1500])
    orgs = [ent.text for ent in doc.ents if ent.label_ == "ORG"]
    
    patterns = [
        r'(?:at|@)\s+([A-Z][A-Za-z]+)(?:,|\s|\.)',  # "at Epic,"
        r'([A-Z][A-Za-z\s&.]+?)\s+is\s+(?:hiring|looking|seeking)',
        r'join\s+([A-Z][A-Za-z\s&.]+?)(?:\s+as|\s+today|\.|,)',
        r'[Aa]bout\s+([A-Z][A-Za-z]+)\s*\n',  # About Epic
        r'(?:work|working)\s+(?:at|for)\s+([A-Z][A-Za-z]+)',  # working at Epic
    ]
    
    regex_matches = []
    for pattern in patterns:
        matches = re.findall(pattern, text[:1000])
        regex_matches.extend(matches)
    
    # Filter out common false positives
    stop_words = {'the', 'our', 'we', 'this', 'that', 'about', 'description', 'job', 
                  'position', 'team', 'company', 'organization', 'us', 'a', 'an'}
    all_candidates = [c.strip() for c in (orgs + regex_matches) 
                      if c.lower().strip() not in stop_words and len(c.strip()) > 1]
    
    return all_candidates[0] if all_candidates else None

def extract_location_ner(text):
    doc = nlp(text[:1500])
    locations = [ent.text for ent in doc.ents if ent.label_ in ["GPE", "LOC"]]
    
    patterns = [
        # "based in Madison, WI" or "located in Madison, WI"
        r'(?:based|located|position|campus)\s*(?:in|on|at)\s*(?:our\s*)?(?:campus\s*in\s*)?([A-Z][a-z]+(?:\s*,\s*[A-Z]{2})?)',
        # "Madison, WI area"
        r'([A-Z][a-z]+,\s*[A-Z]{2})\s*area',
        # "in Madison, WI"
        r'(?:in|at)\s+([A-Z][a-z]+,\s*[A-Z]{2})',
        # Relocation to location
        r'[Rr]elocation\s*to\s*(?:the\s*)?([A-Z][a-z]+(?:,\s*[A-Z]{2})?)',
        # City, State format
        r'([A-Z][a-z]+,\s*[A-Z][a-z]+)',
    ]
    
    regex_matches = []
    for pattern in patterns:
        matches = re.findall(pattern, text[:1500])
        regex_matches.extend(matches)
    
    # Filter common false positives
    stop_locations = {'remote', 'hybrid', 'onsite', 'on-site', 'virtual'}
    all_locations = [loc for loc in (regex_matches + locations) 
                     if loc.lower().strip() not in stop_locations]
    
    return all_locations[0].strip() if all_locations else None

def extract_skills_dict(text):
    text_lower = text.lower()
    found_skills = []
    for skill in skill_dictionary:
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found_skills.append(skill)
    return found_skills

def extract_experience_pattern(text):
    text_lower = text.lower()
    years_min = None
    years_max = None
    level = "Not Specified"
    
    # Extract years patterns
    year_patterns = [
        (r'(\d+)\s*\+\s*years?', 'min'),
        (r'(\d+)\s*-\s*(\d+)\s*years?', 'range'),
        (r'(\d+)\s*to\s*(\d+)\s*years?', 'range'),
        (r'minimum\s*(?:of\s*)?(\d+)\s*years?', 'min'),
        (r'at\s*least\s*(\d+)\s*years?', 'min'),
        (r'up\s*to\s*(\d+)\s*years?', 'max'),
        (r'(\d+)\s*years?\s*(?:of\s*)?experience', 'min'),
        (r'experience[:\s]*(\d+)\s*-\s*(\d+)\s*years?', 'range'),
        (r'(\d+)\s*years?\s*minimum', 'min'),
    ]
    
    for pattern, ptype in year_patterns:
        match = re.search(pattern, text_lower)
        if match:
            if ptype == 'range':
                years_min = int(match.group(1))
                years_max = int(match.group(2))
            elif ptype == 'min':
                years_min = int(match.group(1))
            elif ptype == 'max':
                years_max = int(match.group(1))
            break
    
    # Determine level based on patterns
    exec_patterns = [r'\bdirector\b', r'\bexecutive\b', r'\bvp\b', r'vice president', r'\bchief\b', r'head of', r'c-level', r'\bcto\b', r'\bcio\b', r'\bcdo\b']
    senior_patterns = [r'\bsenior\b', r'\bsr\.', r'\blead\b', r'\bprincipal\b', r'\bstaff\b', r'\bexpert\b', r'sde\s*-?\s*(?:iii|3)', r'sde\s*-?\s*ii\b', r'level\s*(?:iii|3|4|5)']
    mid_patterns = [r'mid[\s-]?level', r'\bassociate\b', r'\bintermediate\b', r'sde\s*-?\s*ii\b', r'level\s*(?:ii|2)']
    entry_patterns = [
        r'entry[\s-]?level', r'\bjunior\b', r'\bjr\.', r'fresh\s*grad', r'new\s*grad', r'recent\s*grad',
        r'\bintern\b', r'\binternship\b', r'co-?op', r'\bcoop\b',
        r'sde\s*-?\s*i\b', r'sde\s*i\b', r'level\s*(?:i|1)\b',
        r'bs/?ba\s*(?:or\s*greater|required)', r'bachelor.*required', r'degree\s*required',
        r'0-?\d?\s*years?', r'no\s*(?:prior\s*)?experience\s*(?:required|needed)?'
    ]
    
    for p in exec_patterns:
        if re.search(p, text_lower):
            level = "Executive"
            break
    if level == "Not Specified":
        for p in senior_patterns:
            if re.search(p, text_lower):
                level = "Senior"
                break
    if level == "Not Specified":
        for p in mid_patterns:
            if re.search(p, text_lower):
                level = "Mid-Level"
                break
    if level == "Not Specified":
        for p in entry_patterns:
            if re.search(p, text_lower):
                level = "Entry-Level"
                break
    
    # Infer level from years if not found
    if level == "Not Specified" and years_min is not None:
        if years_min >= 10:
            level = "Executive"
        elif years_min >= 5:
            level = "Senior"
        elif years_min >= 2:
            level = "Mid-Level"
        else:
            level = "Entry-Level"
    
    return {"level": level, "years_min": years_min, "years_max": years_max}

def extract_salary_regex(text):
    patterns = [
        # Hourly rates with decimals: $47.84/hr - $96.15/hr
        r'\$\s*(\d+\.?\d*)\s*/\s*hr\s*.*?(?:up\s*to|to|-)\s*\$?\s*(\d+\.?\d*)\s*/\s*hr',
        r'\$\s*(\d+\.?\d*)\s*(?:per\s*hour|/hour|/hr)\s*.*?(?:up\s*to|to|-)\s*\$?\s*(\d+\.?\d*)\s*(?:per\s*hour|/hour|/hr)',
        # Hourly single value
        r'\$\s*(\d+\.?\d*)\s*(?:per\s*hour|/hour|/hr)',
        # Annual salary range: $150,000 - $180,000 per year
        r'\$\s*(\d{1,3}(?:,?\d{3})*)\s*-\s*\$?\s*(\d{1,3}(?:,?\d{3})*)\s*(?:per\s*year|annually|/year|/yr|a\s*year)?',
        # Annual single value
        r'\$\s*(\d{1,3}(?:,?\d{3})*)\s*(?:per\s*year|annually|/year|/yr)',
        # K format: 120k - 150k
        r'(\d{1,3})\s*k\s*-\s*(\d{1,3})\s*k',
        r'\$\s*(\d+)\s*k\s*-\s*\$?\s*(\d+)\s*k',
        # Base pay range text
        r'base\s*pay.*?(?:ranges?\s*(?:from)?)\s*\$?\s*(\d+\.?\d*)\s*/?\s*hr.*?(?:up\s*to|to)\s*\$?\s*(\d+\.?\d*)\s*/?\s*hr',
        r'(?:salary|compensation|pay).*?\$\s*(\d{1,3}(?:,?\d{3})*)',
    ]
    
    text_lower = text.lower()
    
    for pattern in patterns:
        match = re.search(pattern, text_lower)
        if match:
            return match.group(0).strip()
    
    # Fallback: look for any dollar amount pattern
    fallback = re.search(r'\$\s*\d+(?:,?\d{3})*(?:\.\d{2})?\s*(?:/\s*hr|per\s*hour)?(?:\s*[-–to]+\s*\$?\s*\d+(?:,?\d{3})*(?:\.\d{2})?\s*(?:/\s*hr|per\s*hour)?)?', text, re.IGNORECASE)
    if fallback:
        return fallback.group(0).strip()
    
    return None

def extract_h1b_sponsorship(text):
    text_lower = text.lower()
    
    # Patterns indicating NO - will not sponsor (check first)
    no_patterns = [
        r'without\s*visa\s*sponsorship',
        r'without\s*sponsorship',
        r'eligible\s*to\s*work.*without.*sponsor',
        r'authorized\s*to\s*work.*without',
        r'no\s*h1b',
        r'no\s*h-1b',
        r'not\s*sponsor',
        r'cannot\s*sponsor',
        r'can\'t\s*sponsor',
        r'unable\s*to\s*sponsor',
        r'does\s*not\s*sponsor',
        r'doesn\'t\s*sponsor',
        r'will\s*not\s*sponsor',
        r'won\'t\s*sponsor',
        r'no\s*visa\s*sponsor',
        r'no\s*sponsorship',
        r'sponsorship\s*not\s*available',
        r'must\s*be\s*authorized',
        r'must\s*have\s*work\s*authorization',
        r'us\s*citizen[s]?\s*only',
        r'citizen[s]?\s*or\s*green\s*card',
        r'permanent\s*resident[s]?\s*only',
        r'no\s*work\s*visa',
        r'corp[\s-]to[\s-]corp\s*only',
        r'c2c\s*only',
        r'u\.?s\.?\s*work\s*authorization\s*required',
        r'must\s*be\s*legally\s*authorized',
        r'legally\s*authorized\s*to\s*work',
    ]
    
    # Patterns indicating YES - will sponsor
    yes_patterns = [
        r'h1b\s*sponsor',
        r'h-1b\s*sponsor',
        r'visa\s*sponsor',
        r'sponsorship\s*available',
        r'will\s*sponsor',
        r'we\s*sponsor',
        r'offers?\s*sponsorship',
        r'provide[s]?\s*sponsorship',
        r'open\s*to\s*sponsor',
        r'sponsorship\s*provided',
        r'h1b\s*welcome',
        r'h-1b\s*welcome',
        r'visa\s*support',
        r'work\s*authorization\s*sponsor',
        r'immigration\s*sponsor',
    ]
    
    # Check NO patterns first (more restrictive)
    for pattern in no_patterns:
        if re.search(pattern, text_lower):
            return "No"
    
    # Check YES patterns
    for pattern in yes_patterns:
        if re.search(pattern, text_lower):
            return "Yes"
    
    return "Not Mentioned"

def extract_job_type(text):
    text_lower = text.lower()
    
    # Check patterns in order of specificity
    if re.search(r'\b(?:intern(?:ship)?|summer\s*intern|fall\s*intern|spring\s*intern)\b', text_lower):
        return "Internship"
    if re.search(r'\b(?:co-?op|coop)\b', text_lower):
        return "Co-op"
    if re.search(r'\b(?:contract|contractor|freelance|consulting)\b', text_lower):
        return "Contract"
    if re.search(r'\b(?:part[\s-]?time|pt)\b', text_lower):
        return "Part-time"
    if re.search(r'\b(?:full[\s-]?time|ft|permanent)\b', text_lower):
        return "Full-time"
    
    return "Not Specified"

# Main prediction function
def predict_job_info(description: str) -> dict:
    # NLP extractions
    company = extract_company_ner(description)
    location = extract_location_ner(description)
    experience = extract_experience_pattern(description)
    salary = extract_salary_regex(description)
    skills = extract_skills_dict(description)
    h1b_status = extract_h1b_sponsorship(description)
    job_type = extract_job_type(description)
    
    # ML predictions
    desc_tfidf = vectorizer.transform([description])
    role_pred = role_classifier.predict(desc_tfidf)[0]
    role_confidence = float(role_classifier.predict_proba(desc_tfidf)[0].max())
    skill_pred = skill_classifier.predict(desc_tfidf)
    predicted_skills = list(skill_binarizer.inverse_transform(skill_pred)[0])
    
    return {
        "company": company,
        "location": location,
        "experience": experience,
        "salary": salary,
        "job_type": job_type,
        "skills_extracted": skills,
        "role_category": role_pred,
        "role_confidence": role_confidence,
        "predicted_top_skills": predicted_skills,
        "h1b_sponsorship": h1b_status
    }

# API endpoint
@app.post("/analyze", response_model=JobResponse)
def analyze_job(request: JobRequest):
    result = predict_job_info(request.description)
    return result

@app.get("/")
def root():
    return {"message": "Job Classifier API - POST to /analyze with job description"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)