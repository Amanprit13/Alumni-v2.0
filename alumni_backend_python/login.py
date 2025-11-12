from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import PyMongoError
import bcrypt
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configure CORS to allow requests from localhost:3000
CORS(app, 
     resources={
         r"/api/*": {
             "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
             "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
             "allow_headers": ["Content-Type", "Authorization"],
             "supports_credentials": True
         }
     }
)

# MongoDB connection
try:
    client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=5000)
    db = client['users']
    users = db['users']
    client.server_info()
    logger.debug("Connected to MongoDB successfully")
except PyMongoError as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    raise

@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return '', 200
    logger.debug(f"Received register request: {request.get_json()}")
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not all([username, email, password]):
            return jsonify({'message': 'All fields are required'}), 400

        if users.find_one({'email': email}):
            return jsonify({'message': 'Email already registered'}), 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        user_data = {
            'username': username,
            'email': email,
            'password': hashed_password,
            'name': username,
            'graduationYear': '',
            'degree': '',
            'occupation': '',
            'company': '',
            'city': '',
            'country': '',
            'bio': '',
            'profilePicture': 'https://placehold.co/128x128/ADD8E6/000000?text=User'
        }
        result = users.insert_one(user_data)
        logger.info(f"User registered successfully: {email}, ID: {result.inserted_id}")

        return jsonify({'message': 'Registration successful', 'user_id': str(result.inserted_id)}), 201

    except Exception as e:
        logger.error(f"Registration error: {e}")
        return jsonify({'message': 'Internal server error'}), 500

@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200
    logger.debug(f"Received login request: {request.get_json()}")
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400

        email = data.get('email')
        password = data.get('password')

        if not all([email, password]):
            return jsonify({'message': 'Email and password are required'}), 400

        user = users.find_one({'email': email})
        if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return jsonify({'message': 'Invalid email or password'}), 401

        logger.info(f"User logged in successfully: {email}")
        return jsonify({'message': 'Login successful', 'user_id': str(user['_id'])}), 200

    except Exception as e:
        logger.error(f"Login error: {e}")
        return jsonify({'message': 'Internal server error'}), 500

@app.route('/api/profile/<email>', methods=['GET', 'OPTIONS'])
def get_profile(email):
    if request.method == 'OPTIONS':
        return '', 200
    logger.debug(f"Received profile request for email: {email}")
    try:
        user = users.find_one({'email': email})
        if not user:
            return jsonify({'message': 'User not found'}), 404

        profile_data = {
            'name': user.get('name', user.get('username', 'Unknown')),
            'email': user.get('email', ''),
            'graduationYear': user.get('graduationYear', ''),
            'degree': user.get('degree', ''),
            'occupation': user.get('occupation', ''),
            'company': user.get('company', ''),
            'city': user.get('city', ''),
            'country': user.get('country', ''),
            'bio': user.get('bio', ''),
            'profilePicture': user.get('profilePicture', 'https://placehold.co/128x128/ADD8E6/000000?text=User'),
            'location': f"{user.get('city', '')}, {user.get('country', '')}".strip(', ')
        }
        return jsonify(profile_data), 200

    except Exception as e:
        logger.error(f"Profile fetch error: {e}")
        return jsonify({'message': 'Internal server error'}), 500

@app.route('/api/profile/<email>', methods=['PUT', 'OPTIONS'])
def update_profile(email):
    if request.method == 'OPTIONS':
        return '', 200
    logger.debug(f"Received profile update request for email: {email}, data: {request.get_json()}")
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400

        user = users.find_one({'email': email})
        if not user:
            return jsonify({'message': 'User not found'}), 404

        update_data = {
            'name': data.get('fullName', user.get('name', user.get('username', ''))),
            'graduationYear': data.get('graduationYear', user.get('graduationYear', '')),
            'degree': data.get('degreeProgram', user.get('degree', '')),
            'occupation': data.get('occupation', user.get('occupation', '')),
            'company': data.get('company', user.get('company', '')),
            'city': data.get('city', user.get('city', '')),
            'country': data.get('country', user.get('country', '')),
            'bio': data.get('bio', user.get('bio', '')),
            'profilePicture': data.get('profilePicture', user.get('profilePicture', 'https://placehold.co/128x128/ADD8E6/000000?text=User'))
        }
        result = users.update_one({'email': email}, {'$set': update_data})
        if result.matched_count == 0:
            return jsonify({'message': 'User not found'}), 404

        logger.info(f"Profile updated successfully for: {email}, data: {update_data}")
        return jsonify({'message': 'Profile updated successfully'}), 200

    except Exception as e:
        logger.error(f"Profile update error: {e}")
        return jsonify({'message': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

# import socketio
# from fastapi import FastAPI, Depends, HTTPException, status
# from fastapi.middleware.cors import CORSMiddleware
# from motor.motor_asyncio import AsyncIOMotorClient
# from pydantic import BaseModel, Field
# # NEW IMPORT for Pydantic V2 compatibility
# from pydantic_core import core_schema 
# from typing import List, Dict, Optional
# from datetime import datetime
# from bson import ObjectId
# from contextlib import asynccontextmanager
# from fastapi.requests import Request
# from jose import JWTError, jwt
# import bcrypt
# from pymongo import MongoClient, errors as PyMongoErrors
# import logging

# # Set up logging (matching your login.py structure)
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# # --- Pydantic Models & Helpers ---

# # *** UPDATED PyObjectId for Pydantic V2 ***
# class PyObjectId(ObjectId):
#     """Custom type for MongoDB ObjectId to work with Pydantic V2."""

#     @classmethod
#     def __get_validators__(cls):
#         # This is still present for tools/compatibility, but the core schema is primary
#         yield cls.validate

#     @classmethod
#     def validate(cls, v):
#         if not ObjectId.is_valid(v):
#             raise ValueError("Invalid ObjectId")
#         return ObjectId(v)
    
#     @classmethod
#     def __get_pydantic_core_schema__(
#         cls, source_type: any, handler: any
#     ) -> core_schema.CoreSchema:
#         return core_schema.json_or_python_schema(
#             # Define how to handle it when it's passed as a Python object
#             python_schema=core_schema.with_default_factory_schema(
#                 core_schema.is_instance_schema(ObjectId),
#                 default_factory=lambda: ObjectId(),
#             ),
#             # Define how to handle it when it's passed from JSON (must be a string)
#             json_schema=core_schema.str_schema(),
#             # Define how to convert from the Python type to the JSON representation
#             serialization=core_schema.to_string_ser_schema(
#                 core_schema.is_instance_schema(ObjectId)
#             )
#         )

# class Message(BaseModel):
#     user: str
#     text: str
#     chatId: str
#     timestamp: int = Field(default_factory=lambda: int(datetime.now().timestamp() * 1000))
#     id: Optional[PyObjectId] = Field(alias="_id")

#     class Config:
#         # Note: 'allow_population_by_field_name' is renamed to 'validate_by_name' in Pydantic V2
#         # We keep it as is, relying on Pydantic's deprecation warning until renamed.
#         arbitrary_types_allowed = True
#         json_encoders = {ObjectId: str}
#         allow_population_by_field_name = True

# class UserCredentials(BaseModel):
#     email: str
#     password: str

# # --- Configuration ---
# MONGO_URI = "mongodb://localhost:27017/"
# # Using 'users' DB and 'users' collection for authentication, like in login.py
# AUTH_DB_NAME = "users"
# USERS_COLLECTION = "users"
# # Using 'chat_db' for messages
# CHAT_DB_NAME = "chat_db"
# COLLECTION_NAME = "messages"
# SECRET_KEY = "your-secret-key"
# ALGORITHM = "HS256"

# # --- Synchronous PyMongo Client for Auth (matching login.py) ---
# try:
#     # Synchronous client for FastAPI login endpoint
#     sync_client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
#     sync_db = sync_client[AUTH_DB_NAME]
#     sync_users_collection = sync_db[USERS_COLLECTION]
#     sync_client.server_info()
#     logger.debug("Connected to synchronous MongoDB for Auth successfully")
# except PyMongoErrors.PyMongoError as e:
#     logger.error(f"Failed to connect to synchronous MongoDB for Auth: {e}")
#     sync_client = None

# # --- Socket.IO and FastAPI Setup ---
# sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=["http://localhost:3000"])

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Asynchronous client for chat messages (Motor)
#     try:
#         app.mongodb_client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000)
#         await app.mongodb_client.admin.command('ping')
#         app.mongodb = app.mongodb_client[CHAT_DB_NAME]
#         logger.debug(f"Connected to asynchronous MongoDB for Chat: {CHAT_DB_NAME}")
#     except Exception as e:
#         logger.error(f"Failed to connect to asynchronous MongoDB for Chat: {e}")
#         app.mongodb = None
    
#     # Store the synchronous auth collection
#     app.sync_users_collection = sync_users_collection if sync_client else None
    
#     yield
#     if hasattr(app, 'mongodb_client'):
#         app.mongodb_client.close()
#         logger.debug("Disconnected from asynchronous MongoDB!")
#     if sync_client:
#         sync_client.close()
#         logger.debug("Disconnected from synchronous MongoDB!")

# fastapi_app = FastAPI(
#     title="Async FastAPI/MongoDB Chat",
#     description="A real-time chat server using WebSockets and Motor (MongoDB).",
#     lifespan=lifespan
# )
# app = socketio.ASGIApp(sio, other_asgi_app=fastapi_app)

# fastapi_app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # --- Authentication Helpers (Using bcrypt) ---
# def verify_password(plain_password, hashed_password):
#     # bcrypt.checkpw expects bytes
#     return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)

# # Dependency to get Auth Collection
# def get_sync_users_collection(request: Request):
#     if not request.app.sync_users_collection:
#          raise HTTPException(status_code=503, detail="Database connection error")
#     return request.app.sync_users_collection

# async def authenticate_user(request: Request):
#     authorization = request.headers.get("Authorization")
#     if not authorization or not authorization.startswith("Bearer "):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or missing authentication token in 'Authorization: Bearer <token>' header."
#         )
#     token = authorization.split(" ")[1]
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         email = payload.get("sub")
#         if not email:
#             raise HTTPException(status_code=401, detail="Invalid token: No email sub")
        
#         users_collection = get_sync_users_collection(request) 
#         user = users_collection.find_one({"email": email})
        
#         if not user:
#             raise HTTPException(status_code=401, detail="User not found")
#         return email
#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.error(f"Authentication error: {e}")
#         raise HTTPException(status_code=500, detail="Internal server error during authentication")


# # --- Login Endpoint ---
# @fastapi_app.post("/api/login")
# async def login(user_creds: UserCredentials, users_collection=Depends(get_sync_users_collection)):
#     logger.debug(f"Received login request for: {user_creds.email}")
#     try:
#         db_user = users_collection.find_one({"email": user_creds.email})
        
#         # Check if user exists and password is correct
#         if not db_user or not verify_password(user_creds.password, db_user["password"]):
#             raise HTTPException(status_code=401, detail="Invalid email or password")
        
#         access_token = jwt.encode({"sub": user_creds.email}, SECRET_KEY, algorithm=ALGORITHM)
#         logger.info(f"User logged in successfully: {user_creds.email}")
#         return {"access_token": access_token, "token_type": "bearer", "user_id": str(db_user["_id"])}

#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.error(f"Login error: {e}")
#         raise HTTPException(status_code=500, detail="Internal server error")

# # --- Socket.IO Event Handlers ---
# @sio.event
# async def connect(sid, environ):
#     await sio.enter_room(sid, 'global')
#     print(f"Client connected: {sid}")

# @sio.event
# async def disconnect(sid):
#     print(f"Client disconnected: {sid}")

# @sio.on('join_chat')
# async def join_chat(sid, data):
#     chat_id = str(data.get('chatId'))
#     if chat_id:
#         await sio.enter_room(sid, chat_id)
#         print(f"Client {sid} joined chat room: {chat_id}")

# @sio.on('message')
# async def handle_message(sid, data):
#     print(f"Message from {sid}: {data}")
#     if not fastapi_app.mongodb:
#         logger.error("MongoDB (Chat) is not available to store message.")
#         return
#     try:
#         # Pydantic will now correctly handle the PyObjectId in Message model
#         message_data = Message(**data).dict(by_alias=True)
#         chat_id = str(message_data.get('chatId'))
        
#         await fastapi_app.mongodb[COLLECTION_NAME].insert_one(message_data)
        
#         await sio.emit('message', data, room=chat_id, skip_sid=sid)
#     except Exception as e:
#         logger.error(f"Error handling message: {e}")

# @sio.on('typing')
# async def handle_typing(sid, data):
#     chat_id = str(data.get('chatId'))
#     if chat_id:
#         await sio.emit('typing', data, room=chat_id, skip_sid=sid)

# # --- REST Endpoint ---
# @fastapi_app.get("/api/messages", response_model=List[Message])
# async def get_messages(chatId: Optional[str] = None, current_user: str = Depends(authenticate_user)):
#     if not fastapi_app.mongodb:
#         raise HTTPException(status_code=503, detail="Database connection error for chat messages")
    
#     query = {}
#     if chatId:
#         query['chatId'] = chatId
        
#     messages_collection = fastapi_app.mongodb[COLLECTION_NAME]
    
#     cursor = messages_collection.find(query).sort("timestamp", 1).limit(100)
#     messages = await cursor.to_list(length=100)
    
#     return [Message(**msg) for msg in messages]

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)