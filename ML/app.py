from flask import Flask, jsonify
import requests
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from flask_cors import CORS
import os
from environs import Env

env = Env()
env.read_env()

app = Flask(__name__)
CORS(app) 
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

BEARER_TOKEN = os.getenv("BEARER_TOKEN")

@app.route('/predict', methods=['GET'])
def fetch_feedbacks():
    try:
        headers = {
            'Authorization': f'bearer {BEARER_TOKEN}'
        }
        response = requests.get("http://localhost:5000/customer/auth/bulkprovider", headers=headers)
        if response.status_code == 200:
            feedback_data = response.json()['provider']
            data = [{i['providerId'] : i['providerFeedback']} for i in feedback_data]
            key = [list(i.keys())[0] for i in data]
            d = {}
            for i in data:
                key = list(i.keys())[0]
                value = list(i.values())
                feeds = []
                for j in value[0]:
                    feeds.append(j['feedback'])
                d[key] = feeds
            data = d
        else:
            return jsonify({"error": "Failed to fetch data from the server"}), response.status_code
        results = {}
        for provider_id, feedbacks in data.items():
            total_score = 0
            for feedback in feedbacks:
                sentiment_score = sia.polarity_scores(feedback)
                total_score += sentiment_score['compound']
            average_score = total_score / (len(feedbacks) if len(feedbacks) > 0 else 1)
            results[provider_id] = round(average_score, 2)
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
