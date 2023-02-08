from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import light

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
def read_root():
    return {"msg": "Connect!"}
