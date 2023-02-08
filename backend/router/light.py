from datetime import datetime, timedelta
from typing import List, Optional, Union
from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel

from config.database import db


class Light(BaseModel):
    room_id: int
    isAuto: bool
    brightness: int
    isOn: bool


router = APIRouter(prefix="/light",
                   tags=["light"])

