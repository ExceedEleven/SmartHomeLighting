from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from router import light
from config.database import db
from router.control import auto, manual
from router.model import Light

origins = ['*']

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(light.router)

@app.get("/")
def get_all_light():
    collection = db["smarthome_light"]
    data = collection.find({}, {"_id": False})
    result = list(data)

    return {"result": result}

@app.put("/")
def update_light(light: Light):
    if light.room_id not in range(0, 3):
        raise HTTPException(status_code=404, detail="Room Id not in range (0-2)")
    if light.brightness not in range(0, 256):
        raise HTTPException(status_code=404, detail="Brightness not in range (0-255)")
    
    if light.is_auto:
        auto("hardware", light)
    else:
        manual("hardware", light)
        
    return {"result": "Update success"}

# def read_root():
#     return {"msg": "Connect!"}
