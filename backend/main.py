from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import light
from config.database import db

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

# def read_root():
#     return {"msg": "Connect!"}
