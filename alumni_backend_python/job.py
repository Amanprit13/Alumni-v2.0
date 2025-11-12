# A conceptual example using Python and Flask-PyMongo
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import requests
import datetime
import json
from apscheduler.schedulers.background import BackgroundScheduler
# For your future AI features
# import google.generativeai as genai 

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/alumni_job_board"  # Your MongoDB connection string
mongo = PyMongo(app)

def fetch_and_store_jobs():
    """Fetches jobs from an aggregator API and stores them in MongoDB."""
    api_key = "YOUR_JOB_AGGREGATOR_API_KEY"
    query = "software engineer"
    location = "remote"
    
    try:
        response = requests.get(
            f"https://api.jobaggregator.com/v1/jobs?query={query}&location={location}&key={api_key}"
        )
        response.raise_for_status()  # Raise an HTTPError for bad status codes (4xx or 5xx)

        # Check if the response content is empty before trying to parse JSON
        if not response.content:
            print("Error: The API response was empty.")
            return

        # Attempt to parse the JSON content
        try:
            jobs = response.json().get("jobs", [])
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
            print(f"Response Status Code: {response.status_code}")
            print(f"Response Text: {response.text}")
            return

        # Clear existing jobs before inserting new ones
        mongo.db.jobs.delete_many({})

        if jobs:
            mongo.db.jobs.insert_many(jobs)
            print(f"Successfully inserted {len(jobs)} jobs into MongoDB.")
        else:
            print("No new jobs found.")
            
    except requests.exceptions.RequestException as e:
        print(f"Error fetching jobs: {e}")
        print(f"Response Status Code: {response.status_code}")

# Schedule the job fetching function to run periodically
scheduler = BackgroundScheduler()
scheduler.add_job(fetch_and_store_jobs, 'interval', hours=24)
scheduler.start()

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    """API endpoint to retrieve all jobs from MongoDB."""
    jobs = mongo.db.jobs.find({}, {"_id": 0})  # Exclude the _id field
    return jsonify(list(jobs))

@app.route('/api/jobs/post', methods=['POST'])
def post_job():
    """API endpoint to allow users to post new jobs."""
    try:
        job_data = request.get_json()
        if not job_data:
            return jsonify({"error": "No data provided"}), 400
            
        # Add a timestamp to the new job posting
        job_data['postedDate'] = datetime.datetime.now()
        
        # Insert the new job into the database
        mongo.db.jobs.insert_one(job_data)
        
        return jsonify({"message": "Job posted successfully!"}), 201
    except Exception as e:
        print(f"Error posting job: {e}")
        return jsonify({"error": "An error occurred while posting the job."}), 500

if __name__ == '__main__':
    # Initial fetch on startup
    fetch_and_store_jobs()
    app.run(debug=True)
