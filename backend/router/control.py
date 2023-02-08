from config.database import db
from light import Light


def manual(sender: str, light: Light):
    pass


def auto(sender: str, light: Light):
    collection = db['smarthome_light']
    if sender == "front":
        collection.update_one({"room_id": light.room_id}, {"$set": {"is_auto": light.isAuto}})
    elif sender == "hardware":
        collection.update_one({"room_id": light.room_id}, {"$set": {"brightness": light.brightness,
                                                                    "is_on": light.isOn}})