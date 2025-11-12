from pymongo import MongoClient

# Use this to get a database client that can be reused.
# The client object is lazily initialized and thread-safe.
_client = None

def get_db():
    global _client
    if _client is None:
        try:
            _client = MongoClient("mongodb://localhost:27017/")
            print("Successfully created new MongoDB client.")
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")
            raise

    # Return the database instance
    return _client.mydatabase

# Example usage
if __name__ == "__main__":
    try:
        db = get_db()
        # Now you can use the 'db' object throughout your application
        collection = db.my_app_collection
        collection.insert_one({"status": "database is ready"})
        print("Test document inserted into the application's database.")
    except Exception as e:
        print("Application failed to start:", e)