from pydantic import BaseModel

class Light(BaseModel):
    room_id: int
    is_auto: bool
    brightness: int
    is_on: bool
