base_image_path = 'path_to_base_artisan_image.png'
base_image = Image.open(base_image_path)

text_instruction = "Change the color of the pot to deep blue with golden tribal patterns"

response = client.models.generate_content(
    model='gemini-2.5-flash-image-preview',
    contents=[base_image, text_instruction],
)

for part in response.candidates[0].content.parts:
    if part.inline_data:
        image = Image.open(BytesIO(part.inline_data.data))
        image.save('customized_artisan_design.png')
        image.show()