# alumni_backend_python/routes/chat.py
from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from db import get_database # Import the function to get the database instance

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat/group', methods=['GET'])
def get_group_chat_messages():
    """
    Fetches all group chat messages.
    """
    db = get_database()
    messages = []
    # Fetch messages, sort by timestamp for chronological order
    for msg in db.group_chat_messages.find().sort("timestamp", 1):
        msg['_id'] = str(msg['_id']) # Convert ObjectId to string
        messages.append(msg)
    return jsonify(messages), 200

@chat_bp.route('/chat/group', methods=['POST'])
def post_group_chat_message():
    """
    Adds a new group chat message.
    """
    db = get_database()
    data = request.get_json()

    # Basic validation
    if not data or not data.get('sender') or not data.get('text') or not data.get('timestamp'):
        return jsonify({"message": "Missing required message fields (sender, text, timestamp)."}), 400

    message_data = {
        "sender": data['sender'],
        "originalSenderId": data.get('originalSenderId', 'unknown'),
        "text": data['text'],
        "timestamp": data['timestamp'], # Stored as ISO string
        "mode": "group", # Ensure it's marked as group chat
        "reactions": data.get('reactions', {}),
        "type": data.get('type', 'text'),
        "edited": data.get('edited', False)
    }

    try:
        result = db.group_chat_messages.insert_one(message_data)
        message_data['_id'] = str(result.inserted_id) # Add the new ID to the response
        return jsonify({"message": "Message sent successfully!", "data": message_data}), 201
    except Exception as e:
        print(f"Error inserting chat message: {e}")
        return jsonify({"message": "Internal server error during message send."}), 500

@chat_bp.route('/chat/group/<string:message_id>', methods=['PUT'])
def update_group_chat_message(message_id):
    """
    Updates an existing group chat message by its ID.
    """
    db = get_database()
    data = request.get_json()

    if not data or 'text' not in data:
        return jsonify({"message": "Missing required field 'text' for update."}), 400

    try:
        object_id = ObjectId(message_id)
        result = db.group_chat_messages.update_one(
            {"_id": object_id},
            {"$set": {"text": data['text'], "edited": True}}
        )
        if result.modified_count > 0:
            return jsonify({"message": "Message updated successfully!"}), 200
        else:
            return jsonify({"message": "Message not found or no changes made."}), 404
    except Exception as e:
        print(f"Error updating chat message: {e}")
        return jsonify({"message": "Invalid message ID or internal server error."}), 400

@chat_bp.route('/chat/group/<string:message_id>/reactions', methods=['PUT'])
def update_group_chat_message_reactions(message_id):
    """
    Updates reactions for an existing group chat message.
    """
    db = get_database()
    data = request.get_json()

    if not data or 'reactions' not in data or not isinstance(data['reactions'], dict):
        return jsonify({"message": "Missing or invalid 'reactions' field."}), 400

    try:
        object_id = ObjectId(message_id)
        result = db.group_chat_messages.update_one(
            {"_id": object_id},
            {"$set": {"reactions": data['reactions']}}
        )
        if result.modified_count > 0:
            return jsonify({"message": "Reactions updated successfully!"}), 200
        else:
            return jsonify({"message": "Message not found or no changes made."}), 404
    except Exception as e:
        print(f"Error updating message reactions: {e}")
        return jsonify({"message": "Invalid message ID or internal server error."}), 400

@chat_bp.route('/chat/group/<string:message_id>', methods=['DELETE'])
def delete_group_chat_message(message_id):
    """
    Deletes a group chat message by its ID.
    """
    db = get_database()
    try:
        object_id = ObjectId(message_id)
        result = db.group_chat_messages.delete_one({"_id": object_id})
        if result.deleted_count > 0:
            return jsonify({"message": "Message deleted successfully!"}), 200
        else:
            return jsonify({"message": "Message not found."}), 404
    except Exception as e:
        print(f"Error deleting chat message: {e}")
        return jsonify({"message": "Invalid message ID or internal server error."}), 400
