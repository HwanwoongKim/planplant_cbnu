# Import Libraries
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import layers, losses
from tensorflow.keras.models import Model
from keras.callbacks import EarlyStopping
import ssm_model

# Setup Constants
n_train_img = 25
n_test_img = 1
img_size = 1024
activ_func = 'relu6'

# Load & Normalize Train Image
train_origin = []

for i in range (n_train_img):
    filename = 'dataset/train/train' + str(format(i+1, '03')) + '.png'
    try:
        image = cv2.imread(filename, cv2.IMREAD_UNCHANGED)
        image = cv2.cvtColor(image, cv2.COLOR_BGRA2RGBA) # BGR->RGB
        image = cv2.resize(image,(img_size,img_size), interpolation=cv2.INTER_AREA)
    except Exception as e:
        print(str(e))
    image = np.array(image)
    train_origin.append(image)

train_origin = np.array(train_origin, dtype="float32")
train_origin /= 255.0

#Load & Normalize Result Image
result = []

for i in range (n_train_img):
    filename = 'dataset/result/result' + str(format(i+1, '03')) + '.png'
    try:
        image = cv2.imread(filename, cv2.IMREAD_UNCHANGED)
        image = cv2.cvtColor(image, cv2.COLOR_BGRA2RGBA) # BGR->RGB
        image = cv2.resize(image,(img_size,img_size), interpolation=cv2.INTER_AREA)
    except Exception as e:
        print(str(e))
    image = np.array(image)
    result.append(image[:, :, 3])

result = np.array(result, dtype="float32")
result /= 255.0

# Create Model
input_g, output_p = ssm_model.model_spec()
model = Model(inputs=input_g, outputs=output_p)
model.summary()

# Train Model
# Patience의 횟수에 따라 모델의 성능이 달라지는 것을 경험적으로 확인함.
early_stopping = EarlyStopping(monitor="val_loss", patience=40, mode="min")

model.compile(optimizer='adam', loss=losses.BinaryCrossentropy())
model.fit(train_origin, result, validation_split=0.2, epochs=200, verbose=1, callbacks=[early_stopping], batch_size=8)

# Save Model Weights
#model.save('./model')
model.save_weights('./model_weights')