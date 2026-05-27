import numpy as np
from PIL import Image

def preprocess_image(image):
    image = image.convert("RGB")
    image = image.resize((224, 224))

    image = np.array(image) / 255.0

    for c in range(3):
        image[..., c] = (
            image[..., c] - image[..., c].mean()
        ) / (image[..., c].std() + 1e-6)

    return image