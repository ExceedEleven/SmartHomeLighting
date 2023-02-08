from datetime import datetime, timedelta
from typing import List, Optional, Union

from config.database import db
from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel


class Light(BaseModel):
    room_id: int
    isAuto: bool
    brightness: int
    isOn: bool


router = APIRouter(prefix="/light",
                   tags=["light"])

@router.get("/")
def get_all_light():
    collection = db["smarthome_light"]
    data = collection.find({}, {"_id": False})
    result = list(data)

    return {"data": result}


@router.get("/{room_id}")
def get_light(room_id: int):
    collection = db["smarthome_light"]

    values = collection.find({"room_id": room_id}, {"_id": False})

    values = list(values)

    if (len(values) == 0):
        raise HTTPException(status_code=404, detail="Room not found")

    result = values[0]
    return {"data": result}
