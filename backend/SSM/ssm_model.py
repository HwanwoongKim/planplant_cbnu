import tensorflow as tf
from tensorflow.keras import layers, losses

# Setup Constants
n_train_img = 25
n_test_img = 1
img_size = 1024
activ_func = 'relu6'

def model_spec():
    input_g = tf.keras.Input(shape=(img_size,img_size,4))
    print(input_g)
            
    conv0 = layers.Conv2D(16, (3,3), activation=activ_func, padding = 'same')(input_g)
    mp0 = layers.MaxPooling2D((2,2))(conv0)
            
    conv1 = layers.Conv2D(32, (3,3), activation=activ_func, padding = 'same')(mp0)
    mp1 = layers.MaxPooling2D((2,2))(conv1)

    conv2 = layers.Conv2D(64, (3,3), activation=activ_func, padding = 'same')(mp1)
    mp2 = layers.MaxPooling2D((2,2))(conv2)
            
    conv3 = layers.Conv2D(128, (3,3), activation=activ_func, padding = 'same')(mp2)
    mp3 = layers.MaxPooling2D((2,2))(conv3)
            
    conv4 = layers.Conv2D(256, (3,3), activation=activ_func, padding = 'same')(mp3)
    mp4 = layers.MaxPooling2D((2,2))(conv4)

    conv5 = layers.Conv2D(512, (3,3), activation=activ_func, padding = 'same')(mp4)
    mp5 = layers.MaxPooling2D((2,2))(conv5)

    conv6 = layers.Conv2D(1024, (3,3), activation=activ_func, padding = 'same')(mp5)
    mp6 = layers.MaxPooling2D((2,2))(conv6)
            
    output_e = layers.Conv2D(2048, (3,3), activation=activ_func, padding = 'same')(mp6)

    convt0 = layers.Conv2DTranspose(1024, (3,3), activation=activ_func, padding='same')(output_e)
    upsamp0 = layers.UpSampling2D((2,2))(convt0)
    skipcon0 = layers.Concatenate(axis=3)([conv6, upsamp0])
    conv7 = layers.Conv2D(256, (3,3), activation = activ_func, padding='same')(skipcon0)

    convt1 = layers.Conv2DTranspose(512, (3,3), activation=activ_func, padding='same')(conv7)
    upsamp1 = layers.UpSampling2D((2,2))(convt1)
    skipcon1 = layers.Concatenate(axis=3)([conv5, upsamp1])
    conv8 = layers.Conv2D(256, (3,3), activation = activ_func, padding='same')(skipcon1)

    convt2 = layers.Conv2DTranspose(256, (3,3), activation=activ_func, padding='same')(conv8)
    upsamp2 = layers.UpSampling2D((2,2))(convt2)
    skipcon2 = layers.Concatenate(axis=3)([conv4, upsamp2])
    conv9 = layers.Conv2D(256, (3,3), activation = activ_func, padding='same')(skipcon2)

    convt3 = layers.Conv2DTranspose(128, (3,3), activation=activ_func, padding='same')(conv9)
    upsamp3 = layers.UpSampling2D((2,2))(convt3)
    skipcon3 = layers.Concatenate(axis=3)([conv3, upsamp3])
    conv10 = layers.Conv2D(128, (3,3), activation = activ_func, padding='same')(skipcon3)

    convt4 = layers.Conv2DTranspose(64, (3,3), activation=activ_func, padding='same')(conv10)
    upsamp4 = layers.UpSampling2D((2,2))(convt4)
    skipcon4 = layers.Concatenate(axis=3)([conv2, upsamp4])
    conv11 = layers.Conv2D(64, (3,3), activation=activ_func, padding='same')(skipcon4)

    convt5 = layers.Conv2DTranspose(32, (3,3), activation=activ_func, padding='same')(conv11)
    upsamp5 = layers.UpSampling2D((2,2))(convt5)
    skipcon5 = layers.Concatenate(axis=3)([conv1, upsamp5])
    conv12 = layers.Conv2D(32, (3,3), activation=activ_func, padding='same')(skipcon5)
            
    convt6 = layers.Conv2DTranspose(16, (3,3), activation=activ_func, padding='same')(conv12)
    upsamp6 = layers.UpSampling2D((2,2))(convt6)
    skipcon6 = layers.Concatenate(axis=3)([conv0, upsamp6])
    conv13 = layers.Conv2D(16, (3,3), activation=activ_func, padding='same')(skipcon6)

    layer_alpha = layers.Conv2DTranspose(4, (3,3), activation='relu', padding='same')(conv13)

    output_p = layers.Conv2DTranspose(1, (3,3), activation='sigmoid', padding='same')(layer_alpha)

    return input_g, output_p