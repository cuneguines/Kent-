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

@app.route('/api/user', methods=['POST'])
def create_user():
    data = request.get_json()
    print(data)
    fname = data.get('fname')
    lname = data.get('lname')
    email = data.get('email')

    try:
        # Create a cursor object
        cursor = conn.cursor()

        # Insert the user data into the 'users' table
        cursor.execute("INSERT INTO users (fname, lname, email) VALUES (?, ?, ?)", fname, lname, email)
        conn.commit()

        return jsonify({'success': True, 'message': 'User created successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})



if __name__ == '__main__':
    app.run()
