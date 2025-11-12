# import socketio
# from fastapi import FastAPI, Depends, HTTPException, status
# from fastapi.middleware.cors import CORSMiddleware
# from motor.motor_asyncio import AsyncIOMotorClient
# from pydantic import BaseModel, Field
# from typing import List, Dict, Optional
# from datetime import datetime
# from bson import ObjectId
# from contextlib import asynccontextmanager
# from fastapi.requests import Request
# from jose import JWTError, jwt
# from passlib.context import CryptContext

# # --- Pydantic Models & Helpers ---
# class PyObjectId(ObjectId):
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.validate
#     @classmethod
#     def validate(cls, v):
#         if not ObjectId.is_valid(v):
#             raise ValueError("Invalid ObjectId")
#         return ObjectId(v)
#     @classmethod
#     def __modify_schema__(cls, field_schema):
#         field_schema.update(type="string")

# class Message(BaseModel):
#     user: str
#     text: str
#     chatId: str
#     timestamp: int = Field(default_factory=lambda: int(datetime.now().timestamp() * 1000))
#     id: Optional[PyObjectId] = Field(alias="_id")

#     class Config:
#         arbitrary_types_allowed = True
#         json_encoders = {ObjectId: str}
#         allow_population_by_field_name = True

# class User(BaseModel):
#     email: str
#     password: str

# # --- Configuration ---
# MONGO_URI = "mongodb://localhost:27017/"
# DB_NAME = "chat_db"
# COLLECTION_NAME = "messages"
# USERS_COLLECTION = "users"
# SECRET_KEY = "your-secret-key"  # Replace with a secure key in production
# ALGORITHM = "HS256"
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # --- Socket.IO and FastAPI Setup ---
# sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=["http://localhost:3000"])

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     try:
#         app.mongodb_client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000)
#         await app.mongodb_client.admin.command('ping')
#         app.mongodb = app.mongodb_client[DB_NAME]
#         print("Connected to MongoDB!")
#     except Exception as e:
#         print(f"Failed to connect to MongoDB: {e}")
#     yield
#     if hasattr(app, 'mongodb_client'):
#         app.mongodb_client.close()
#         print("Disconnected from MongoDB!")

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

# # --- Authentication ---
# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password):
#     return pwd_context.hash(password)

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
#             raise HTTPException(status_code=401, detail="Invalid token")
#         user = await fastapi_app.mongodb[USERS_COLLECTION].find_one({"email": email})
#         if not user:
#             raise HTTPException(status_code=401, detail="User not found")
#         return email
#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")

# # --- Login Endpoint ---
# @fastapi_app.post("/api/login")
# async def login(user: User):
#     db_user = await fastapi_app.mongodb[USERS_COLLECTION].find_one({"email": user.email})
#     if not db_user or not verify_password(user.password, db_user["password"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     access_token = jwt.encode({"sub": user.email}, SECRET_KEY, algorithm=ALGORITHM)
#     return {"access_token": access_token, "token_type": "bearer"}

# # --- Register Endpoint ---
# @fastapi_app.post("/api/register")
# async def register(user: User):
#     if await fastapi_app.mongodb[USERS_COLLECTION].find_one({"email": user.email}):
#         raise HTTPException(status_code=400, detail="Email already registered")
#     hashed_password = get_password_hash(user.password)
#     await fastapi_app.mongodb[USERS_COLLECTION].insert_one({
#         "email": user.email,
#         "password": hashed_password
#     })
#     return {"message": "User registered successfully"}

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
#     try:
#         message_data = Message(**data).dict(by_alias=True)
#         chat_id = str(message_data.get('chatId'))
#         await fastapi_app.mongodb[COLLECTION_NAME].insert_one(message_data)
#         await sio.emit('message', data, room=chat_id, skip_sid=sid)
#     except Exception as e:
#         print(f"Error handling message: {e}")

# @sio.on('typing')
# async def handle_typing(sid, data):
#     chat_id = str(data.get('chatId'))
#     if chat_id:
#         await sio.emit('typing', data, room=chat_id, skip_sid=sid)

# # --- REST Endpoint ---
# @fastapi_app.get("/api/messages", response_model=List[Message])
# async def get_messages(chatId: Optional[str] = None, current_user: str = Depends(authenticate_user)):
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

import socketio
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from pydantic_core import core_schema 
from typing import List, Dict, Optional
from datetime import datetime
from bson import ObjectId
from contextlib import asynccontextmanager
from fastapi.requests import Request
from jose import JWTError, jwt
import bcrypt
from pymongo import MongoClient, errors as PyMongoErrors
import logging

# Set up logging (matching your login.py structure)
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# -------------------- Pydantic Models & Helpers --------------------

# *** FIX: UPDATED PyObjectId for Pydantic V2 ***
class PyObjectId(ObjectId):
    """Custom type for MongoDB ObjectId to work with Pydantic V2."""
    
    # Required for Pydantic V2 compatibility
    @classmethod
    def __get_pydantic_core_schema__(
        cls, source_type: any, handler: any
    ) -> core_schema.CoreSchema:
        return core_schema.json_or_python_schema(
            # How to handle it as a Python object
            python_schema=core_schema.with_default_schema( 
                core_schema.is_instance_schema(ObjectId),
                default_factory=lambda: ObjectId(),
            ),
            # How to handle it when it comes from JSON (must be a string)
            json_schema=core_schema.str_schema(),
            
            # 🐛 FIX: to_json() is the correct method for Pydantic V2 serialization
            serialization=core_schema.to_json(
                core_schema.str_schema(), # Serialize to string
                # Call str() on the ObjectId instance for output
                json_encoder=lambda x: str(x), 
            ),
        )

class Message(BaseModel):
    user: str
    text: str
    chatId: str
    timestamp: int = Field(default_factory=lambda: int(datetime.now().timestamp() * 1000))
    id: Optional[PyObjectId] = Field(alias="_id")

    class Config:
        arbitrary_types_allowed = True
        # ✅ Pydantic V2 FIX: Use 'by_alias' setting instead of deprecated 'allow_population_by_field_name'
        populate_by_name = True
        # Removed json_encoders as PyObjectId handles serialization now

class UserCredentials(BaseModel):
    email: str
    password: str

# -------------------- Configuration --------------------
MONGO_URI = "mongodb://localhost:27017/"
AUTH_DB_NAME = "users"
USERS_COLLECTION = "users"
CHAT_DB_NAME = "chat_db"
COLLECTION_NAME = "messages"
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# --- Synchronous PyMongo Client for Auth (matching login.py) ---
try:
    sync_client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    sync_db = sync_client[AUTH_DB_NAME]
    sync_users_collection = sync_db[USERS_COLLECTION]
    sync_client.server_info()
    logger.debug("Connected to synchronous MongoDB for Auth successfully")
except PyMongoErrors.PyMongoError as e:
    logger.error(f"Failed to connect to synchronous MongoDB for Auth: {e}")
    sync_client = None

# -------------------- Socket.IO and FastAPI Setup --------------------
# 🛑 ENHANCEMENT: Store active SIDs/Users for Socket.IO authentication
active_sids = {} # {sid: user_email}

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=["http://localhost:3000"])

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Asynchronous client for chat messages (Motor)
    try:
        app.mongodb_client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        await app.mongodb_client.admin.command('ping')
        app.mongodb = app.mongodb_client[CHAT_DB_NAME]
        logger.debug(f"Connected to asynchronous MongoDB for Chat: {CHAT_DB_NAME}")
    except Exception as e:
        logger.error(f"Failed to connect to asynchronous MongoDB for Chat: {e}")
        app.mongodb = None
    
    app.sync_users_collection = sync_users_collection if sync_client else None
    
    yield
    if hasattr(app, 'mongodb_client'):
        app.mongodb_client.close()
        logger.debug("Disconnected from asynchronous MongoDB!")
    if sync_client:
        sync_client.close()
        logger.debug("Disconnected from synchronous MongoDB!")

fastapi_app = FastAPI(
    title="Async FastAPI/MongoDB Chat",
    description="A real-time chat server using WebSockets and Motor (MongoDB).",
    lifespan=lifespan
)
app = socketio.ASGIApp(sio, other_asgi_app=fastapi_app)

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Authentication Helpers --------------------
def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)

def get_sync_users_collection(request: Request):
    if not request.app.sync_users_collection:
          raise HTTPException(status_code=503, detail="Database connection error")
    return request.app.sync_users_collection

async def get_user_email_from_token(token: str, request: Request):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token: No email sub")
        
        users_collection = get_sync_users_collection(request) 
        user = users_collection.find_one({"email": email})
        
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        logger.error(f"Token verification error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Used by the REST endpoints
async def authenticate_user(request: Request):
    authorization = request.headers.get("Authorization")
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing authentication token in 'Authorization: Bearer <token>' header."
        )
    token = authorization.split(" ")[1]
    
    # 💡 REFACTOR: Use the shared token validation logic
    return await get_user_email_from_token(token, request)


# -------------------- Endpoints --------------------

@fastapi_app.post("/api/login")
async def login(user_creds: UserCredentials, users_collection=Depends(get_sync_users_collection)):
    logger.debug(f"Received login request for: {user_creds.email}")
    try:
        db_user = users_collection.find_one({"email": user_creds.email})
        
        if not db_user or not verify_password(user_creds.password, db_user["password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # NOTE: The token payload uses the email ("sub") as the identifier.
        access_token = jwt.encode({"sub": user_creds.email}, SECRET_KEY, algorithm=ALGORITHM)
        logger.info(f"User logged in successfully: {user_creds.email}")
        
        # Return the user's MongoDB ObjectId as user_id (string)
        return {"access_token": access_token, "token_type": "bearer", "user_id": str(db_user["_id"])}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


# -------------------- Socket.IO Event Handlers --------------------
@sio.event
async def connect(sid, environ):
    # Get the FastAPI Request object from the ASGI environment
    request = Request(environ) 
    
    # Get authentication data from the query parameters (sent by frontend hook)
    query_params = request.query_params
    token = query_params.get('token')
    
    if not token:
        logger.warning(f"Client {sid} denied connection: Missing token in query params.")
        return False # Deny connection
        
    try:
        # 🛑 ENHANCEMENT: Authenticate the socket connection using the token
        user_email = await get_user_email_from_token(token, request)
        
        # Store the user's email/ID associated with the SID
        active_sids[sid] = user_email
        await sio.enter_room(sid, 'global')
        logger.info(f"Client connected and authenticated: {sid} as {user_email}")
        return True # Allow connection
        
    except HTTPException as e:
        logger.error(f"Client {sid} denied connection: Token validation failed: {e.detail}")
        return False # Deny connection on auth failure
    except Exception as e:
        logger.error(f"Client {sid} connection error: {e}")
        return False

@sio.event
async def disconnect(sid):
    # Clean up the active SIDs mapping
    if sid in active_sids:
        user_email = active_sids.pop(sid)
        logger.info(f"Client disconnected: {sid} ({user_email})")
    else:
        logger.info(f"Client disconnected: {sid} (unauthenticated)")


@sio.on('join_chat')
async def join_chat(sid, data):
    # Ensure the user is authenticated before allowing room join
    if sid not in active_sids:
        logger.warning(f"Unauthenticated client {sid} attempted to join chat.")
        return 
        
    chat_id = str(data.get('chatId'))
    
    if chat_id:
        await sio.enter_room(sid, chat_id)
        logger.debug(f"Client {sid} ({active_sids[sid]}) joined chat room: {chat_id}")

@sio.on('message')
async def handle_message(sid, data, ack): # 🔑 CRITICAL: Added 'ack' argument
    # 🛑 CRITICAL: Check authentication before processing the message
    if sid not in active_sids:
        logger.warning(f"Unauthenticated client {sid} sent message: {data}")
        # Call ack with an error if available, though unauthenticated clients might not send it
        if ack:
            ack({"status": "error", "detail": "Authentication failed."})
        return
        
    user_email = active_sids[sid]
    logger.debug(f"Message from {user_email} ({sid}): {data}")

    if not fastapi_app.mongodb:
        logger.error("MongoDB (Chat) is not available to store message.")
        if ack:
            ack({"status": "error", "detail": "Server database unavailable."})
        return
        
    try:
        # 💡 VALIDATION: Ensure the 'user' field in the message matches the authenticated user
        if data.get('user') != user_email:
             logger.warning(f"User {user_email} tried to send message as another user: {data.get('user')}")
             if ack:
                ack({"status": "error", "detail": "User ID mismatch."})
             return 
             
        # Use Pydantic to validate and prepare the message for MongoDB
        # This will automatically handle the alias '_id' for the optional 'id' field
        message_data = Message(**data).model_dump(by_alias=True) 
        chat_id = str(message_data.get('chatId'))
        
        # Save to database
        result = await fastapi_app.mongodb[COLLECTION_NAME].insert_one(message_data)
        
        # 💡 ENHANCEMENT: Get the generated MongoDB _id for better client tracking
        # Re-insert the new _id into the broadcast data, and use it for acknowledgment
        data['_id'] = str(result.inserted_id)
        
        # Broadcast to room (excluding the sender)
        await sio.emit('message', data, room=chat_id, skip_sid=sid)
        
        # 🔑 CRITICAL: Call the acknowledgment function to signal success
        if ack:
            ack({"status": "ok", "id": str(result.inserted_id)})
            
    except Exception as e:
        logger.error(f"Error handling message from {user_email}: {e}")
        # Call the acknowledgment function with an error status
        if ack:
            ack({"status": "error", "detail": "Failed to save message."})

@sio.on('typing')
async def handle_typing(sid, data):
    # Check authentication
    if sid not in active_sids:
        return
        
    chat_id = str(data.get('chatId'))
    if chat_id:
        await sio.emit('typing', data, room=chat_id, skip_sid=sid)

# --- REST Endpoint ---
@fastapi_app.get("/api/messages", response_model=List[Message])
async def get_messages(chatId: Optional[str] = None, current_user: str = Depends(authenticate_user)):
    # current_user is the authenticated user email (from the dependency)
    if not fastapi_app.mongodb:
        raise HTTPException(status_code=503, detail="Database connection error for chat messages")
    
    query = {}
    if chatId:
        query['chatId'] = chatId
    
    messages_collection = fastapi_app.mongodb[COLLECTION_NAME]
    
    # Use to_list(length=None) to get all results up to 100
    cursor = messages_collection.find(query).sort("timestamp", 1).limit(100)
    messages = await cursor.to_list(length=100)
    
    return [Message(**msg) for msg in messages]

if __name__ == "__main__":
    import uvicorn
    # Use the 'app' ASGI wrapper for Socket.IO
    uvicorn.run(app, host="0.0.0.0", port=8000)