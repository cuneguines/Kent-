from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)
conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=KPTSVSP;"
    "Database=SPACE_BOOKING;"
    "UID=sa;"
    "PWD=SAPB1Admin;"
)

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
        # Create a cursor object
        cursor = conn.cursor()

        # Delete the user with the given user_id from the 'users' table
        cursor.execute("DELETE FROM users WHERE id = ?", user_id)

        # Check the row count to determine if the user was deleted
        if cursor.rowcount > 0:
            conn.commit()
            return jsonify({"success": True, "message": "User deleted successfully"})
        else:
            return jsonify({"success": False, "message": "User not found"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

    finally:
        cursor.close()   




@app.route('/api/user', methods=['POST'])
def create_user():
    data = request.get_json()
    
    fname = data.get('fname')
    lname = data.get('lname')
    email = 'ss@gmail.com'

    try:
        # Create a cursor object
        cursor = conn.cursor()

        # Insert the user data into the 'users' table
        cursor.execute("INSERT INTO users (fname, lname, email) VALUES (?, ?, ?)", fname, lname, email)
        conn.commit()

        return jsonify({'success': True, 'message': 'User created successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        cursor.close()
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        # Create a cursor object
        cursor = conn.cursor()

        # Fetch all users from the 'users' table
        cursor.execute("SELECT * FROM users order by fname")
        rows = cursor.fetchall()
       
        # Convert the rows to a list of dictionaries
        users = []
        for row in rows:
            user = {
                'id': row[0],
                'fname': row[1],
                'lname': row[4],
                'email': row[2]
            }
            users.append(user)
        
        return jsonify(users)
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        cursor.close()

if __name__ == '__main__':
    app.run(port=5000)
