## Setup

### 1. Install Dependencies
```bash
pip install pyspark pandas numpy matplotlib seaborn plotly scikit-learn spacy nltk
python -m spacy download en_core_web_sm
```

### 2. Download Dataset
- Download archive (1).zip from Kaggle - LinkedIn Job Postings
- Link: https://www.kaggle.com/datasets/arshkon/linkedin-job-postings
- Place it in your working directory

---

## How to Run

### STEP 1: Create Cleaned Dataset (START HERE)
**Run: DS_5110_Project (5).ipynb**

- Unzips the dataset
- Cleans and processes all job postings
- Creates ./clean_linkedin_jobs_parquet/ folder
- Run time: approximately 5-10 minutes

### STEP 2: Visualizations
**Run: Untitled15 (1).ipynb**

- Requires: ./clean_linkedin_jobs_parquet/ from Step 1
- Creates charts and graphs
- Run time: approximately 2-3 minutes

### STEP 3: Machine Learning Models
**Run: Untitled16 (1).ipynb**

- Requires: ./clean_linkedin_jobs_parquet/ from Step 1
- Trains ML models and saves .pkl files
- Run time: approximately 10-15 minutes

---

## Google Colab (Recommended)

1. Upload archive (1).zip to Colab
2. Open and run all cells in DS_5110_Project (5).ipynb
3. Open and run all cells in Untitled15 (1).ipynb
4. Open and run all cells in Untitled16 (1).ipynb

---

## Troubleshooting

**"File not found" error?**
- Make sure Step 1 completed successfully
- Check that ./clean_linkedin_jobs_parquet/ folder exists

**Memory error?**
- Use Google Colab with more RAM
- Or reduce dataset size in the notebooks

**spaCy error?**
- Run: python -m spacy download en_core_web_sm