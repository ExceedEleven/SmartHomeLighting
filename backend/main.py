from fastapi import FastAPI
from router import light

app = FastAPI()
app.include_router(light.router)

@app.get("/")
def read_root():
    return {"msg": "Connect!"}
