import os
from flask import Flask, request, jsonify
from google.cloud import translate_v2 as translate

# Google credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\USER\Desktop\react-project\artisan-app\backend\artisian-ecommerce-5a1cb9140115.json"

app = Flask(__name__)
translate_client = translate.Client()

def translate_text(text, target_language="ta"):
    result = translate_client.translate(text, target_language=target_language)
    return result["translatedText"]

@app.route('/')
def home():
    return "Flask Translation API is running 🚀"

@app.route('/api/translate', methods=['POST'])
def translate_endpoint():
    data = request.get_json()
    text = data.get('text', '')
    lang = data.get('language', 'hi')
    translated = translate_text(text, lang)
    return jsonify({"translated": translated})

if __name__ == "__main__":
    app.run(debug=True)