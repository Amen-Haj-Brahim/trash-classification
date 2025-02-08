# from fastapi import FastAPI,File,UploadFile

# app=FastAPI()

# @app.get("/")
# def read_root():
#     return{"message": "hello fastApi"}

# @app.post("/upload/")
# async def upload_file(file: UploadFile = File(...)):
#     if not file:
#         return JSONResponse(content={"error": "No file uploaded"}, status_code=400)
    
#     return {"filename": file.filename, "content_type": file.content_type}


from typing import Union
from fastapi import FastAPI
from fastapi.responses import Response
from pydantic import BaseModel
import json
import base64


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



import tensorflow as tf
from keras.models import load_model
import numpy as np
import os
import cv2 as cv


def predictUserImage(image,classes):
    model=load_model("model.h5")
    img=image.copy()
    print(img.shape,"+++++++++++++++++++++++++++++++++++++++++++++qsdqsdqsdqsdqs")
    # img=img.resize((224,224))
    # img=np.asarray(img)
    # img=img.reshape(*(224,224,-1))
    
    prediction = model.predict(np.expand_dims(img, axis=0))
    argclass = np.argmax(prediction, axis=1)
    print(classes[argclass[0]])
    return classes[argclass[0]]

class Image(BaseModel):
    image: str


@app.get("/")
def read_root():
    return {"Hello": "World"}



@app.post("/upload/")
def read_root(image:Image):
    print(image.image+"--------------------------------------")
    imgdata = base64.b64decode(image.image)
    with open("ts.png", "wb") as f:
        f.write(imgdata)
    img=cv.imread("ts.png")
    res=predictUserImage(img,["clean","dirty"])
    print(res)
    
    json_str = json.dumps({"res":res}, default=str)

    return Response(content=json_str,media_type="application/json")