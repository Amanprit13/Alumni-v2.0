from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for all routes, allowing the Next.js frontend to talk to the backend
CORS(app) 

# --- Configuration ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['JWT_SECRET_KEY'] = 'super-secret' # CHANGE THIS IN PRODUCTION!
app.config['JWT_TOKEN_LOCATION'] = ['headers'] # Default is fine, but good to be explicit

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- Database Model ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

# Create database tables (Run this once when starting the app)
with app.app_context():
    db.create_all()

# ----------------------------------------------------

## Register Route
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not username or not email or not password:
            return jsonify({'message': 'Missing required fields'}), 400

    except Exception:
        return jsonify({'message': 'Invalid JSON format in request'}), 400

    # Continue with registration
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Registration successful'}), 201
    except:
        # This catches unique constraint errors (user/email already exists)
        db.session.rollback()
        return jsonify({'message': 'User already exists or invalid data'}), 409

## Login Route
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
             return jsonify({'message': 'Missing email or password'}), 400
             
    except Exception:
        return jsonify({'message': 'Invalid JSON format in request'}), 400

    user = User.query.filter_by(email=email).first()
    
    # Check if user exists AND password is correct
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    else:
        # Return 401 for invalid credentials (user not found or bad password)
        return jsonify({'message': 'Invalid credentials'}), 401

## Profile Fetch Route (Requires JWT Token)
@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    # get_jwt_identity() returns the user.id that we passed to create_access_token()
    current_user_id = get_jwt_identity() 
    user = User.query.get(current_user_id)
    
    if user:
        return jsonify({
            'username': user.username,
            'email': user.email,
            'id': user.id
            # Add more profile fields as needed
        }), 200
    else:
        return jsonify({'message': 'User not found'}), 404

if __name__ == '__main__':
    # Flask runs on port 5000 by default
    app.run(debug=True, port=5000)