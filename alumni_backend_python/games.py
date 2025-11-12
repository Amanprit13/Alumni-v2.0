# # app.py

# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# from pymongo.errors import ConnectionError
# from flask_cors import CORS

# # --- Configuration ---
# # REPLACE with your actual MongoDB connection string
# MONGO_URI = "mongodb://localhost:27017/" 
# DB_NAME = "game_leaderboard_db"
# COLLECTION_NAME = "scores"

# app = Flask(__name__)
# # Enable CORS for all origins and methods to allow frontend requests
# CORS(app) 

# # --- Database Setup ---
# try:
#     client = MongoClient(MONGO_URI)
#     db = client[DB_NAME]
#     scores_collection = db[COLLECTION_NAME]
#     # Verify connection
#     client.server_info()
#     print("Successfully connected to MongoDB.")
# except ConnectionError as e:
#     print(f"ERROR: Could not connect to MongoDB at {MONGO_URI}. Is the server running?")
#     print(e)
#     # Exit or handle error appropriately in a production app

# # --- Endpoint 1: Submit Score ---
# @app.route('/api/submitScore', methods=['POST'])
# def submit_score():
#     data = request.json
#     name = data.get('name')
#     game = data.get('game')
#     score_change = data.get('scoreChange')

#     if not all([name, game, score_change is not None]):
#         return jsonify({"status": "error", "message": "Missing name, game, or scoreChange."}), 400
    
#     if not isinstance(score_change, (int, float)):
#         return jsonify({"status": "error", "message": "scoreChange must be a number."}), 400

#     try:
#         # Find the existing player document
#         player_doc = scores_collection.find_one({"name": name})

#         if player_doc:
#             # Existing player: Update scores
#             current_total = player_doc.get('score', 0)
#             game_scores = player_doc.get('gameScores', {})
#             current_game_score = game_scores.get(game, 0)
            
#             new_total = current_total + score_change
#             game_scores[game] = current_game_score + score_change

#             scores_collection.update_one(
#                 {"name": name},
#                 {"$set": {
#                     "score": new_total,
#                     "gameScores": game_scores,
#                 }}
#             )
#         else:
#             # New player: Insert new document
#             new_game_scores = {
#                 'Sudoku': score_change if game == 'Sudoku' else 0,
#                 'World Quiz': score_change if game == 'World Quiz' else 0,
#             }
#             scores_collection.insert_one({
#                 "name": name,
#                 "score": score_change,
#                 "gameScores": new_game_scores,
#             })
        
#         return jsonify({"status": "success", "message": f"{name}'s score updated by {score_change}."}), 200

#     except Exception as e:
#         print(f"Database error during score submission: {e}")
#         return jsonify({"status": "error", "message": "Internal server error."}), 500

# # --- Endpoint 2: Get Leaderboard ---
# @app.route('/api/getLeaderboard', methods=['GET'])
# def get_leaderboard():
#     try:
#         # Find all documents, sort by 'score' descending, and convert to list
#         leaderboard_cursor = scores_collection.find().sort("score", -1).limit(50)
        
#         leaderboard_data = []
#         for doc in leaderboard_cursor:
#             # MongoDB's _id is not JSON serializable, so remove it
#             doc.pop('_id', None) 
#             leaderboard_data.append(doc)

#         return jsonify({"status": "success", "data": leaderboard_data}), 200

#     except Exception as e:
#         print(f"Database error during leaderboard retrieval: {e}")
#         return jsonify({"status": "error", "message": "Internal server error."}), 500

# if __name__ == '__main__':
#     # Run the Flask app on port 5000 (default for development)
#     app.run(debug=True, port=5000)

from flask import Flask, request, jsonify
from pymongo import MongoClient
# Use the correct import for error handling, PyMongoError covers connection issues
from pymongo.errors import PyMongoError 
from flask_cors import CORS

# --- Configuration ---
# REPLACE with your actual MongoDB connection string
MONGO_URI = "mongodb://localhost:27017/" 
DB_NAME = "game_leaderboard_db"
COLLECTION_NAME = "scores"

app = Flask(__name__)
# Enable CORS for all origins and methods to allow frontend requests
CORS(app) 

# --- Database Setup ---
try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    scores_collection = db[COLLECTION_NAME]
    # Verify connection
    client.server_info()
    print("Successfully connected to MongoDB.")
# Catch the general PyMongoError which includes connection issues
except PyMongoError as e:
    print(f"ERROR: Could not connect to MongoDB at {MONGO_URI}. Is the server running?")
    print(e)
    # Exit or handle error appropriately in a production app

# --- Endpoint 1: Submit Score ---
@app.route('/api/submitScore', methods=['POST'])
def submit_score():
    data = request.json
    name = data.get('name')
    game = data.get('game')
    score_change = data.get('scoreChange')

    if not all([name, game, score_change is not None]):
        return jsonify({"status": "error", "message": "Missing name, game, or scoreChange."}), 400
    
    if not isinstance(score_change, (int, float)):
        return jsonify({"status": "error", "message": "scoreChange must be a number."}), 400

    try:
        # Find the existing player document
        player_doc = scores_collection.find_one({"name": name})

        if player_doc:
            # Existing player: Use $inc for atomic update of total score
            update_fields = {
                "$inc": {
                    "score": score_change,
                    # Dynamically update the score for the specific game
                    f"gameScores.{game}": score_change
                }
            }

            scores_collection.update_one(
                {"name": name},
                update_fields
            )
        else:
            # New player: Insert new document, only tracking the submitted game's score initially
            scores_collection.insert_one({
                "name": name,
                "score": score_change,
                "gameScores": {
                    game: score_change
                },
            })
        
        return jsonify({"status": "success", "message": f"{name}'s score updated by {score_change} in {game}."}), 200

    except Exception as e:
        print(f"Database error during score submission: {e}")
        return jsonify({"status": "error", "message": "Internal server error."}), 500

# --- Endpoint 2: Get Leaderboard ---
@app.route('/api/getLeaderboard', methods=['GET'])
def get_leaderboard():
    try:
        # Find all documents, sort by 'score' descending, and convert to list
        leaderboard_cursor = scores_collection.find().sort("score", -1).limit(50)
        
        leaderboard_data = []
        for doc in leaderboard_cursor:
            # MongoDB's _id is not JSON serializable, so remove it
            doc.pop('_id', None) 
            leaderboard_data.append(doc)

        return jsonify({"status": "success", "data": leaderboard_data}), 200

    except Exception as e:
        print(f"Database error during leaderboard retrieval: {e}")
        return jsonify({"status": "error", "message": "Internal server error."}), 500

if __name__ == '__main__':
    # Run the Flask app on port 5000 (default for development)
    app.run(debug=True, port=5000)
