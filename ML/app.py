from flask import Flask, jsonify
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from flask_cors import CORS
# from environs import Env
from flask import request

# env = Env()
# env.read_env()

app = Flask(__name__)
CORS(app) 
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

@app.route('/predict', methods=['POST'])
def fetch_feedbacks():
    try:
        response = request.get_json()
        feedback = response.get('feedback')
        rating = response.get('rating')
        sentiment = sia.polarity_scores(feedback)
        feedback_score = sentiment["compound"]
        total_score = (int(rating) + feedback_score*5)/2
        print(total_score)
        return jsonify({"score" : str(total_score)}),200
    except Exception as e:
        return jsonify({"error": str(e)}), 200

if __name__ == '__main__':
    app.run(debug=True)
