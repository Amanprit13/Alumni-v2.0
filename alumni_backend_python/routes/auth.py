# alumni_backend_python/routes/auth.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_database # Import the function to get the database instance

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Handles user registration.
    Expects JSON data with user details including email and password.
    Hashes the password before storing.
    Initializes profile fields like bio and profilePicture.
    """
    db = get_database() # Get the database instance
    data = request.get_json()

    # Basic validation for required fields
    required_fields = ['fullName', 'email', 'password', 'graduationYear', 'agreeToTerms']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"message": f"Missing required field: {field}"}), 400

    if data['password'] != data['confirmPassword']:
        return jsonify({"message": "Passwords do not match."}), 400

    # Check if user already exists
    if db.users.find_one({"email": data['email']}):
        return jsonify({"message": "Email already registered."}), 409 # Conflict

    # Hash the password
    hashed_password = generate_password_hash(data['password'])

    user_data = {
        "fullName": data['fullName'],
        "email": data['email'],
        "password": hashed_password, # Store hashed password
        "graduationYear": data['graduationYear'],
        "degreeProgram": data.get('degreeProgram', ''),
        "occupation": data.get('occupation', ''),
        "company": data.get('company', ''),
        "city": data.get('city', ''),
        "country": data.get('country', ''),
        "agreeToTerms": data['agreeToTerms'],
        "registeredAt": data.get('registeredAt', None),
        "bio": "", # New field for profile
        "profilePicture": "https://placehold.co/128x128/ADD8E6/000000?text=User" # Default profile picture
    }

    try:
        db.users.insert_one(user_data)
        return jsonify({"message": "Registration successful!"}), 201 # Created
    except Exception as e:
        print(f"Error inserting user: {e}")
        return jsonify({"message": "Internal server error during registration."}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Handles user login.
    Expects JSON data with email and password.
    Verifies credentials against the database.
    Returns user email and full name upon successful login.
    """
    db = get_database() # Get the database instance
    data = request.get_json()

    if 'email' not in data or not data['email']:
        return jsonify({"message": "Email is required."}), 400
    if 'password' not in data or not data['password']:
        return jsonify({"message": "Password is required."}), 400

    user = db.users.find_one({"email": data['email']})

    if user and check_password_hash(user['password'], data['password']):
        # In a real application, you would generate a JWT or session token here
        # Return email and full name for the frontend to store and use for profile fetching
        return jsonify({"message": "Login successful!", "user": {"email": user['email'], "fullName": user['fullName']}}), 200
    else:
        return jsonify({"message": "Invalid email or password."}), 401 # Unauthorized
