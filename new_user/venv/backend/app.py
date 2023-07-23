from flask import Flask, request, jsonify, g
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# Set the path to the database file
DATABASE = os.path.join(os.path.dirname('C:\\Users\\cnixon\\AppData\\Roaming\\Python\\Python311\\KENT\\SPACE_BOOKING\\venv\\backend'), 'space_booking.db')

# Function to get the database connection
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Create the users table if it does not exist
def create_users_table():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        create_users_table_query = """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fname TEXT NOT NULL,
            lname TEXT NOT NULL,
            email TEXT NOT NULL
        );
        """
        cursor.execute(create_users_table_query)
        db.commit()

# Initialize the users table
create_users_table()


@app.route('/')
def hello():
    return 'Flask is running!'

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Perform authentication logic here
    if username == 'admin' and password == 'admin123':
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

@app.route('/api/delete/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        db = get_db()
        cursor = db.cursor()

        # Delete the user with the given user_id from the 'users' table
        delete_query = "DELETE FROM users WHERE id = ?"
        cursor.execute(delete_query, (user_id,))
        db.commit()

        # Check the row count to determine if the user was deleted
        if cursor.rowcount > 0:
            return jsonify({"success": True, "message": "User deleted successfully"})
        else:
            return jsonify({"success": False, "message": "User not found"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route('/api/user', methods=['POST'])
def create_user():
    data = request.get_json()
    fname = data.get('fname')
    lname = data.get('lname')
    email = 'ss@gmail.com'  # You can use data.get('email') if the email is provided in the request JSON

    try:
        db = get_db()
        cursor = db.cursor()

        # Insert the user data into the 'users' table
        insert_query = "INSERT INTO users (fname, lname, email) VALUES (?, ?, ?)"
        cursor.execute(insert_query, (fname, lname, email))
        db.commit()

        return jsonify({'success': True, 'message': 'User created successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        db = get_db()
        cursor = db.cursor()

        # Fetch all users from the 'users' table
        select_query = "SELECT * FROM users ORDER BY fname"
        cursor.execute(select_query)
        rows = cursor.fetchall()

        # Convert the rows to a list of dictionaries
        users = []
        for row in rows:
            user = {
                'id': row[0],
                'fname': row[1],
                'lname': row[2],
                'email': row[3]
            }
            users.append(user)

        return jsonify(users)
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

if __name__ == '__main__':
    app.run(port=5001)
