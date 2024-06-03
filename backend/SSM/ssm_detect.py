# Import Libraries
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import layers, losses
from tensorflow.keras.models import Model
from keras.callbacks import EarlyStopping
import ssm_model as ssm

# Setup Constants
n_train_img = 25
n_test_img = 1
img_size = 1024
activ_func = 'relu6'

# Model Specificatino
input_g, output_p = ssm.model_spec()

# Load Model
model = Model(inputs=input_g, outputs=output_p)
model.load_weights('./model_weights')
model.summary()

# Load Image
test = []

for i in range (n_test_img):
    filename = 'dataset/test/test' + str(format(i+1, '03')) + '.png'
    try:
        image = cv2.imread(filename, cv2.IMREAD_UNCHANGED)
        image = cv2.cvtColor(image, cv2.COLOR_BGRA2RGBA) # BGR->RGB
        image = cv2.resize(image,(img_size,img_size), interpolation=cv2.INTER_AREA)
    except Exception as e:
        print(str(e))
    image = np.array(image)
    test.append(image)

test = np.array(test, dtype="float32")
test /= 255.0

# Segment Image
test_prediction = np.array(model(test))
print(np.max(test_prediction[:, :, :]), np.min(test_prediction[:, :, :]))
print(test.shape, test_prediction.shape)
test[:, :, :, 3] = test_prediction[:, :, :, 0]

print(np.max(test_prediction[:, :, :, 0]))
plt.hist(test_prediction[:, :, :, 0].flatten(), bins=60, color='skyblue', edgecolor='black')
plt.show()

test_prediction[test_prediction[:, :, :, 0] < 0.5] = 0.0
test_prediction[test_prediction[:, :, :, 0] >= 0.5] = 1.0