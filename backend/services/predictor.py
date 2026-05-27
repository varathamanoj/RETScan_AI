import torch
import joblib
import numpy as np
import models_vit as models

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# -----------------------------------
# Load RETFound model
# -----------------------------------
def load_retfound(checkpoint_path):
    checkpoint = torch.load(
        checkpoint_path,
        map_location="cpu",
        weights_only=False
    )

    model = models.__dict__["RETFound_mae"](
        img_size=224,
        num_classes=5,
        drop_path_rate=0,
        global_pool=True,
    )

    model.load_state_dict(checkpoint["model"], strict=False)

    model.to(device)
    model.eval()

    return model


# -----------------------------------
# Extract feature
# -----------------------------------
def extract_feature(image_array, retfound_model):
    x = torch.tensor(image_array).unsqueeze(0)
    x = torch.einsum("nhwc->nchw", x).to(device)

    with torch.no_grad():
        latent = retfound_model.forward_features(x.float())

    return torch.squeeze(latent).cpu().numpy()


# -----------------------------------
# Final prediction
# -----------------------------------
def predict(image_array, retfound_model, classifier_model):
    feature = extract_feature(image_array, retfound_model)

    probabilities = classifier_model.predict_proba([feature])[0]
    prediction = int(np.argmax(probabilities))

    return prediction, probabilities.tolist()