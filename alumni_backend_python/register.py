from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ConnectionError
import bcrypt
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configure CORS to allow requests from localhost:3000
CORS(app, 
     resources={
         r"/api/*": {
             "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
             "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
             "allow_headers": ["Content-Type", "Authorization"],
             "supports_credentials": True  # Optional: if you need cookies/auth
         }
     }
)

# MongoDB connection
try:
    client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=5000)
    db = client['users']
    users = db['users']
    # Test the connection
    client.server_info()  # Raises exception if connection fails
    logger.info("Connected to MongoDB successfully")
except ConnectionError as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    raise

@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not all([username, email, password]):
            return jsonify({'message': 'All fields are required'}), 400

        # Check if user already exists
        if users.find_one({'email': email}):
            return jsonify({'message': 'Email already registered'}), 400

        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Store user in MongoDB
        user_data = {
            'username': username,
            'email': email,
            'password': hashed_password
        }
        result = users.insert_one(user_data)
        logger.info(f"User registered successfully: {email}, ID: {result.inserted_id}")

        return jsonify({'message': 'Registration successful', 'user_id': str(result.inserted_id)}), 201

    except Exception as e:
        logger.error(f"Registration error: {e}")
        return jsonify({'message': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)