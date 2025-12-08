# LinkedIn Job Analysis

---

## Setup

### 1. Install Dependencies

```bash
pip install pyspark pandas numpy matplotlib seaborn plotly scikit-learn spacy nltk
python -m spacy download en_core_web_sm
```

### 2. Download Dataset

- Download `archive (1).zip` from Kaggle - LinkedIn Job Postings
- Link: https://www.kaggle.com/datasets/arshkon/linkedin-job-postings
- Place it in your working directory

---

## Training ML Models

### STEP 1: Create Cleaned Dataset (START HERE)

**Run: `data_cleaning.ipynb`**

- Unzips the dataset
- Cleans and processes all job postings
- Creates `./clean_linkedin_jobs_parquet/` folder
- Run time: approximately 5-10 minutes

### STEP 2: Visualizations

**Run: `data_visulization.ipynb`**

- Requires: `./clean_linkedin_jobs_parquet/` from Step 1
- Creates charts and graphs
- Run time: approximately 2-3 minutes

### STEP 3: Machine Learning Models

**Run: `ml_training.ipynb`**

- Requires: `./clean_linkedin_jobs_parquet/` from Step 1
- Trains ML models and saves `.pkl` files
- Run time: approximately 10-15 minutes
- **Output files to copy to backend folder:**
  - `role_classifier.pkl`
  - `tfidf_vectorizer.pkl`
  - `skill_classifier.pkl`
  - `skill_binarizer.pkl`
  - `skill_dictionary.pkl`

---

## Running the Application

### Backend (FastAPI)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
pip install fastapi uvicorn spacy scikit-learn pydantic
python -m spacy download en_core_web_sm

# Make sure all .pkl model files are in the backend folder

# Start the server
uvicorn main:app --reload --port 8000
```

The API will be available at:

- API: http://localhost:8000

#### API Endpoints

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| GET    | `/`        | API info                |
| POST   | `/analyze` | Analyze job description |

#### Example Request

```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: application/json" \
  -d '{"description": "We are hiring a Senior Software Engineer with 5+ years experience in Python and AWS. Salary: $150,000 - $180,000. H1B sponsorship available."}'
```

#### Example Response

```json
{
  "company": null,
  "location": null,
  "experience": {
    "level": "Senior",
    "years_min": 5,
    "years_max": null
  },
  "salary": "$150,000 - $180,000",
  "job_type": "Full-time",
  "skills_extracted": ["python", "aws"],
  "role_category": "Software Engineer",
  "role_confidence": 0.87,
  "predicted_top_skills": ["information technology", "engineering"],
  "h1b_sponsorship": "Yes"
}
```

---

### Frontend (React)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: http://localhost:8080

**Note:** Make sure the backend is running before using the frontend.

---

## Google Colab (Recommended for Training)

1. Upload `archive (1).zip` to Colab
2. Open and run all cells in `data_cleaning.ipynb`
3. Open and run all cells in `data_visualization.ipynb`
4. Open and run all cells in `ml_training.ipynb`
5. Download the generated `.pkl` files
6. Place them in the `backend/` folder

---

## Troubleshooting

**"File not found" error?**

- Make sure Step 1 completed successfully
- Check that `./clean_linkedin_jobs_parquet/` folder exists

**Memory error?**

- Use Google Colab with more RAM
- Or reduce dataset size in the notebooks

**spaCy error?**

- Run: `python -m spacy download en_core_web_sm`

**Backend not starting?**

- Ensure all `.pkl` files are in the `backend/` folder
- Check that all dependencies are installed

**Frontend can't connect to backend?**

- Make sure backend is running on port 8000
- Check CORS settings if using different ports

**Model files missing?**

- Run Step 3 (Untitled16 notebook) to generate the `.pkl` files
- Copy all 5 `.pkl` files to the `backend/` folder

---

## Tech Stack

| Layer           | Technology                      |
| --------------- | ------------------------------- |
| Frontend        | React, TypeScript, Tailwind CSS |
| Backend         | FastAPI, Python                 |
| ML/NLP          | scikit-learn, spaCy, TF-IDF     |
| Data Processing | PySpark, Pandas                 |

---

## Features

- **Company Extraction** - NER-based company detection
- **Location Extraction** - GPE (Geo-Political Entity) detection
- **Experience Level** - Entry/Mid/Senior/Executive classification
- **Years of Experience** - Min/Max years extraction
- **Salary Detection** - Annual and hourly rate parsing
- **H1B Sponsorship** - Yes/No/Not Mentioned detection
- **Job Type** - Full-time/Part-time/Internship/Co-op/Contract
- **Skills Extraction** - Dictionary-based skill matching
- **Role Classification** - ML-based job category prediction

---

## Running the Application

### Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
pip install fastapi uvicorn spacy scikit-learn pydantic
python -m spacy download en_core_web_sm

# Start the server
uvicorn main:app --reload --port 8000
```

API available at: http://localhost:8000

### Frontend

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend available at: http://localhost:8080
