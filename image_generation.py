from flask import Flask, request, jsonify
from google import genai
from PIL import Image
from io import BytesIO
import base64

import google.generativeai as genai

genai.configure(api_key=)


app = Flask(__name__)
client = genai.Client()

@app.route("/generate-image", methods=["POST"])
def generate_image():
    data = request.json
    prompt = data.get("prompt")

    response = client.models.generate_images(
        model='imagen-4.0-generate-001',
        prompt=prompt,
        config={"number_of_images": 1},
    )

    images = []
    for generated_image in response.generated_images:
        image_bytes = generated_image.image.image_bytes
        b64_str = base64.b64encode(image_bytes).decode('utf-8')
        images.append(b64_str)

    return jsonify({"images_base64": images})

if __name__ == "__main__":
    app.run(port=5000)