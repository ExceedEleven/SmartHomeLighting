from config.database import db
from router.model import Light


COLLECTION = db['smarthome_light']

def manual(sender: str, light: Light):
    
    if sender == "front":
        COLLECTION.update_one(
            {
                "room_id": light.room_id
            },
            {
                "$set": {
                    "brightness": light.brightness,
                    "is_on": light.is_on,
                    "is_auto": light.is_auto
                }
            }
        )
    elif sender == "hardware":
        COLLECTION.update_one(
            {
                "room_id": light.room_id       
            },
            {
                "$set": {
                    "is_on": light.is_on
                }
            }
        )


def auto(sender: str, light: Light):
    if sender == "front":
        COLLECTION.update_one(
            {
                "room_id": light.room_id
            },
            {
                "$set": {
                    "is_auto": light.is_auto
                }
            }
        )
    elif sender == "hardware":
        COLLECTION.update_one(
            {
                "room_id": light.room_id
            },
            {
                "$set": {
                    "brightness": light.brightness,
                    "is_on": light.is_on,
                }
            }
        )