from google.cloud import aiplatform
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\USER\Desktop\react-project\artisan-app\backend\artisian-ecommerce-5a1cb9140115.json"

from google import genai
client = genai.Client()

from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

client = genai.Client()

# Text prompt for custom artisan product design
prompt = "A handcrafted clay pot decorated with traditional tribal patterns, colorful and vibrant"

response = client.models.generate_images(
    model='imagen-4.0-generate-001',  # Use Imagen model for photorealistic images
    prompt=prompt,
    config=types.GenerateImagesConfig(number_of_images=1)
)

# Save and show the generated image
for generated_image in response.generated_images:
    image_bytes = generated_image.image.image_bytes
    image = Image.open(BytesIO(image_bytes))
    image.save('custom_artisan_design.png')
    image.show()
