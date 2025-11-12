# alumni_backend_python/routes/blog.py
from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from db import get_database # Import the function to get the database instance

blog_bp = Blueprint('blog', __name__)

# --- Helper function to initialize dummy blog data (can be called from app.py) ---
def initialize_blog_data(db_instance):
    """
    Inserts dummy blog posts into the 'blog_posts' collection if it's empty.
    Takes the database instance as an argument.
    """
    if db_instance.blog_posts.count_documents({}) == 0:
        print("Initializing dummy blog posts...")
        blog_posts = [
            {
                "title": 'Navigating Your First Job After Graduation',
                "date": 'July 12, 2024',
                "author": 'Dr. Emily Carter',
                "snippet": 'Dr. Emily Carter shares essential tips for recent graduates entering the professional world, from resume building to networking.',
                "content": "This is the full content for 'Navigating Your First Job After Graduation'. It includes detailed advice on resume optimization, interview techniques, and building a professional network. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                "title": 'The Power of Alumni Mentorship: A Success Story',
                "date": 'July 8, 2024',
                "author": 'AlumniConnect Team',
                "snippet": 'Read about how our mentorship program transformed the career path of a young alumna, thanks to the guidance of an experienced mentor.',
                "content": "This is the full content for 'The Power of Alumni Mentorship'. It highlights the benefits of mentorship, provides testimonials from participants, and encourages more alumni to join the program. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                "title": 'Sustainable Living: Alumni Initiatives Making a Difference',
                "date": 'June 30, 2024',
                "author": 'Sarah Green',
                "snippet": 'Discover inspiring sustainability projects led by our alumni, impacting communities globally.',
                "content": "This is the full content for 'Sustainable Living'. It details various alumni-led initiatives focused on environmental conservation, renewable energy, and community development. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            },
            {
                "title": 'Investing in Your Future: Financial Planning for Young Professionals',
                "date": 'June 25, 2024',
                "author": 'Michael Lee, CFA',
                "snippet": 'Financial expert and alumnus Michael Lee provides actionable advice on budgeting, savings, and investments.',
                "content": "This is the full content for 'Investing in Your Future'. It covers topics like budgeting, debt management, investment strategies, and retirement planning for young professionals. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                "title": 'Beyond the Classroom: Lifelong Learning Opportunities',
                "date": 'June 18, 2024',
                "author": 'Prof. David Kim',
                "snippet": 'Professor David Kim discusses the importance of continuous learning and resources available to alumni for professional development.',
                "content": "This is the full content for 'Lifelong Learning Opportunities'. It explores various avenues for continuous professional development, including online courses, workshops, and alumni networking events. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
            },
            {
                "title": 'The Evolution of Tech: An Alumni Perspective',
                "date": 'June 10, 2024',
                "author": 'Tech Alumni Group',
                "snippet": 'A deep dive into the rapid changes in the tech industry, as seen through the eyes of our tech-savvy alumni.',
                "content": "This is the full content for 'The Evolution of Tech'. It discusses emerging technologies, career opportunities in tech, and the role of alumni in shaping the future of the industry. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
            },
        ]
        db_instance.blog_posts.insert_many(blog_posts)
        print("Dummy blog posts initialized.")

@blog_bp.route('/blogposts', methods=['GET'])
def get_blog_posts():
    """
    Fetches all blog posts from the database.
    """
    db = get_database() # Get the database instance
    posts = []
    for post in db.blog_posts.find():
        post['_id'] = str(post['_id']) # Convert ObjectId to string
        posts.append(post)
    return jsonify(posts), 200

@blog_bp.route('/blogposts/<string:post_id>', methods=['GET'])
def get_single_blog_post(post_id):
    """
    Fetches a single blog post by its ID.
    """
    db = get_database() # Get the database instance
    try:
        post = db.blog_posts.find_one({"_id": ObjectId(post_id)})
        if not post:
            return jsonify({"message": "Blog post not found."}), 404
        post['_id'] = str(post['_id'])
        return jsonify(post), 200
    except Exception as e:
        print(f"Error fetching single blog post: {e}")
        return jsonify({"message": "Invalid post ID or internal server error."}), 400
