from datetime import datetime, timedelta
from typing import List, Optional, Union

from config.database import db
from fastapi import APIRouter, Body, HTTPException
from router.control import auto, manual
from router.model import Light


router = APIRouter(prefix="/light",
                   tags=["light"])

@router.get("/")
def get_all_light():
    collection = db["smarthome_light"]
    data = collection.find({}, {"_id": False})
    result = list(data)

    return {"result": result}


@router.get("/{room_id}")
def get_light(room_id: int):
    if room_id not in range(0, 3):
        raise HTTPException(status_code=404, detail="Room Id not in range (0-2)")

    collection = db["smarthome_light"]

    values = collection.find({"room_id": room_id}, {"_id": False})

    values = list(values)

    if (len(values) == 0):
        raise HTTPException(status_code=404, detail="Room not found")

    result = values[0]

    return {"result": result}

@router.put("/update/{sender}")
def update_light(sender: str, light: Light):
    if light.room_id not in range(0, 3):
        raise HTTPException(status_code=404, detail="Room Id not in range (0-2)")
    if light.brightness not in range(0, 256):
        raise HTTPException(status_code=404, detail="Brightness not in range (0-255)")
   
    res = list(db["smarthome_light"].find({"room_id": light.room_id}, {"_id": False}))
    if len(res) == 0:
        raise HTTPException(status_code=404, detail="Room not found")

    
    if res[0]["is_auto"]:
        auto(sender, light)
    else:
        manual(sender, light)
        
    return {"result": "Update success"}