from fastapi import FastAPI

app=FastAPI()

@app.get("/")
def read_root():
    return{"message": "hello fastApi"}

@app.get("/predict")
def read_item():
    return{}
