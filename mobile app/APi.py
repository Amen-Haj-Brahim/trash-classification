from fastapi import FastAPI,File,UploadFile

app=FastAPI()

@app.get("/")
def read_root():
    return{"message": "hello fastApi"}

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    if not file:
        return JSONResponse(content={"error": "No file uploaded"}, status_code=400)
    
    return {"filename": file.filename, "content_type": file.content_type}