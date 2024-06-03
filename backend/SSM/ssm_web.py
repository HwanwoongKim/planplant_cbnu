# Import Libraries
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import layers, losses
from tensorflow.keras.models import Model
from keras.callbacks import EarlyStopping
from . import ssm_model
from scipy.signal import savgol_filter

class SSM:
    def __init__(self):
        input_g, output_p = ssm_model.model_spec()
        self.model = Model(inputs=input_g, outputs=output_p)
        self.model.load_weights('../model_weights')
        self.image = None
        self.predict_alpha = None
        self.density = None
        self.density_diff = None
        self.result = 0
        self.img_size = 1024
    
    def load_image(self, image):
        image = np.array(image)
        self.image = np.array(image, dtype="float32")
        self.image /= 255.0
    
    def predict(self):
        self.predict_alpha = np.array(self.model(self.image))
        self.predict_alpha[self.predict_alpha[:, :, :] < 0.97] = 0.0
        self.predict_alpha[self.predict_alpha[:, :, :] >= 0.97] = 1.0
    
    def get_density(self):
        soil_hist = np.zeros((256,))
        for pixel, transparency in zip(self.image[:, :, :, :3].reshape(-1, 3), self.predict_alpha[:, :, :].flatten()):
            if transparency == 1.0:
                bright = round((pixel[0] + pixel[1] + pixel[2]) * 255.0 / 3.0)
                soil_hist[:(bright+1)] += 1
        soil_hist /= np.max(soil_hist)
        
        self.density = soil_hist

    def analyze_density(self):
        soil_diff = np.zeros((255, ))
        for i in range(255):
            soil_diff[i] = (self.density[i+1] - self.density[i]) * 100

        soil_2diff = np.zeros((254, ))
        for i in range(254):
            soil_2diff[i] = (soil_diff[i + 1] - soil_diff[i]) * 100

        soil_diff_smooth = savgol_filter(soil_diff, window_length=51, polyorder=3)
        soil_2diff = np.diff(soil_diff_smooth)
        soil_2diff_smooth = savgol_filter(soil_2diff, window_length=51, polyorder=3)
        soil_2diff_smooth_cut = soil_2diff_smooth[50:200]
        soil_2diff_smooth_cut /= np.max(soil_2diff_smooth_cut)

        self.density_diff = soil_2diff_smooth_cut
    
    def get_result(self):
        sign_changes = 0
        last_sign = np.sign(self.density_diff[0]) if self.density_diff[0] != 0 else 0

        for i in range(1, len(self.density_diff)):
            if self.density_diff[i] != 0:
                current_sign = np.sign(self.density_diff[i])
                if current_sign != last_sign and last_sign != 0:
                    sign_changes += 1
                    last_sign = current_sign
            else:
                last_sign = 0
        
        self.result = sign_changes
