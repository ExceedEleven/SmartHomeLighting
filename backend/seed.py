from config.database import db

COLLECTION = db["smarthome_light"]

SEED_DATA = [
    {
        "room_id": 0,
        "is_auto": False,
        "brightness": 0,
        "is_on": False,
    },
    {
        "room_id": 1,
        "is_auto": False,
        "brightness": 0,
        "is_on": False,
    },
    {
        "room_id": 2,
        "is_auto": False,
        "brightness": 0,
        "is_on": False,
    }
]

def main():
    COLLECTION.delete_many({})
    COLLECTION.insert_many(SEED_DATA)
    print("Seed data inserted")
    

if __name__ == "__main__":
    main()