from flask import Flask, jsonify, request
from flask_cors import CORS
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import translator  # Import from translator.py

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
        total_score = (int(rating) + feedback_score * 5) / 2

        return jsonify({"score": str(total_score)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 200

@app.route('/translate', methods=['POST'])
def translate():
    try:
        response = request.get_json()
        text = response.get("text")
        from_lang = response.get("from_lang", "en")
        to_lang = response.get("to_lang", "hi")

        translated_text = translator.translate_text(text, from_lang, to_lang)
        return jsonify({"translated_text": translated_text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
