# alumni_backend_python/routes/profile.py
from flask import Blueprint, request, jsonify
from db import get_database
from utils.auth_utils import auth_required, get_current_user_id
from bson.objectid import ObjectId

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile', methods=['GET'])
@auth_required
def get_user_profile():
    """
    Retrieves the profile of the authenticated user.
    """
    user_id = get_current_user_id()
    db = get_database()
    user_profile = db.users.find_one({"_id": ObjectId(user_id)})

    if user_profile:
        # Convert ObjectId to string for JSON serialization
        user_profile['_id'] = str(user_profile['_id'])
        # Remove sensitive information before sending to frontend
        user_profile.pop('password', None)
        return jsonify(user_profile), 200
    return jsonify({"message": "Profile not found"}), 404

@profile_bp.route('/profile', methods=['PUT'])
@auth_required
def update_user_profile():
    """
    Updates the profile of the authenticated user.
    """
    user_id = get_current_user_id()
    db = get_database()
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided for update"}), 400

    # Filter out non-updatable fields if any, and sensitive fields
    updatable_fields = ['username', 'email', 'bio', 'contact_info', 'profile_picture_url']
    update_data = {k: v for k, v in data.items() if k in updatable_fields}

    if not update_data:
        return jsonify({"message": "No valid fields to update"}), 400

    result = db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})

    if result.modified_count > 0:
        return jsonify({"message": "Profile updated successfully"}), 200
    return jsonify({"message": "Profile not found or no changes made"}), 404

@profile_bp.route('/profile/all', methods=['GET'])
@auth_required
def get_all_user_profiles():
    """
    Retrieves a list of all registered user profiles (non-sensitive data).
    This endpoint is for populating dynamic user lists for chat.
    """
    db = get_database()
    users = []
    # Project only necessary fields for public display
    for user in db.users.find({}, {"username": 1, "email": 1, "bio": 1, "_id": 1}):
        user['_id'] = str(user['_id'])
        # Ensure 'username' exists, default to 'Unknown User' if not
        user['username'] = user.get('username', 'Unknown User')
        users.append(user)
    return jsonify(users), 200

