from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import datetime
import threading
from datetime import timedelta,time

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Database connection and cursor handling with thread-local storage
def get_db():
    db = getattr(threading.current_thread(), '_database', None)
    if db is None:
        db = threading.current_thread()._database = sqlite3.connect('space_booking.db')
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(threading.current_thread(), '_database', None)
    if db is not None:
        db.close()

# Create tables if they don't exist
def create_tables():
    conn = get_db()
    cursor = conn.cursor()

    create_users_table = """
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fname TEXT NOT NULL,
        lname TEXT NOT NULL,
        email TEXT NOT NULL
    );
    """

    create_booking_clone_table = """
    CREATE TABLE IF NOT EXISTS booking_clone (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        new_name TEXT NOT NULL,
        date datetime NOT NULL,
        space TEXT NOT NULL,
        startTime TEXT NOT NULL,
        endTime TEXT NOT NULL,
        Date_today TEXT NOT NULL,
        day TEXT NOT NULL
    );
    """

    cursor.execute(create_users_table)
    cursor.execute(create_booking_clone_table)
    conn.commit()

# Initialize the tables at the start of the application
create_tables()

@app.route('/api/user', methods=['GET'])
def get_user():
    
    conn = get_db()
    cursor = conn.cursor()

    query = "SELECT fname, lname FROM users order by fname;"
    cursor.execute(query)
    rows = cursor.fetchall()

    # Convert the data to a list of dictionaries
    data = []
    for row in rows:
        data.append({
            'fname': row[0],
            'lname': row[1],
            # Add more columns as needed
        })

    # Close the cursor (don't close the connection as it's handled by the teardown_appcontext)
    cursor.close()
    print(data)
    return jsonify(data)


@app.route('/api/data/<space>', methods=['GET'])
def get_data(space):
    conn = get_db()
    cursor = conn.cursor()

    query = "SELECT id, date,new_name, startTime, endTime, Date_today, day FROM booking_clone WHERE space = ?;"
    cursor.execute(query, (space,))
    rows = cursor.fetchall()
    
    # Convert the data to a list of dictionaries
    data = []
    for row in rows:
        # Check if the 'date' column is not None before formatting
        formatted_date = None
        if row[1] is not None:
        # Assuming the 'date' column is in the format 'YYYY-MM-DD'
            formatted_date = f"{row[1][5:7]}/{row[1][8:10]}/{row[1][2:4]}"
            print(formatted_date)
        data.append({
            'id': row[0],
            'Date': formatted_date,
            'space': space,
            'name': row[2],
            'startTime': row[3],
            'endTime': row[4],
            'Date_today': row[5],
            'day': row[6].strip(),
            # Add more columns as needed
        })

    # Close the cursor
    cursor.close()

    return jsonify(data)

@app.route('/')
def hello():
    return 'Flask is running!'







@app.route('/api/bookings', methods=['POST'])
def add_booking():
    conn = get_db()
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data = request.get_json()
    name = data.get('name')
    date = data.get('date')
    space = data.get('space')
    startTime = data.get('startTime')
    endTime = data.get('endTime')
    date_Today = now
    day = data.get('day')
    print(date)
    start_time = datetime.datetime.strptime(startTime, '%H:%M:%S')
    end_time = datetime.datetime.strptime(endTime, '%H:%M:%S')
    
    today = datetime.datetime.today().date()
    start_datetime = datetime.datetime.combine(today, start_time.time())
    end_datetime = datetime.datetime.combine(today, end_time.time())

    # Loop through the time difference and insert entries for each interval
    current_time = start_datetime
    while current_time < end_datetime:
        next_time = current_time + timedelta(minutes=30)  # Assuming each entry has a duration of 30 minutes

        # Insert a new booking entry into the database
        insert_query = "INSERT INTO booking_clone (new_name, date, space, startTime, endTime, Date_today, day) VALUES (?, ?, ?, ?, ?, ?, ?)"
        cursor = conn.cursor()
        current_time_only = current_time.strftime('%H:%M:%S')
        next_time_only = next_time.strftime('%H:%M:%S')
        cursor.execute(insert_query, (name, date, space, current_time_only, next_time_only, date_Today, day))
        cursor.close()
        current_time = next_time

    conn.commit()

    return jsonify({'message': 'Booking created successfully'})


@app.route('/api/bookings/<booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    conn = get_db()
    cursor = conn.cursor()

    delete_query = "DELETE FROM booking_clone WHERE id = ?"
    cursor.execute(delete_query, (booking_id,))
    cursor.close()

    conn.commit()

    return jsonify({'message': 'Booking deleted successfully'})


@app.route('/available-times/<date>/<space>', methods=['GET'])
def get_available_times(date, space):
    conn = get_db()
    item = ['08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00']
    new_list = []

    cursor = conn.cursor()

    date = datetime.datetime.strptime(date, '%Y-%m-%d').date()

    query = "SELECT DISTINCT startTime FROM booking_clone WHERE space = ? AND date = ?"
    cursor.execute(query, (space, date,))
    available_times = [str(row[0]) for row in cursor.fetchall()]

    for element in item:
        if element not in available_times:
            new_list.append(element)

    cursor.close()

    return jsonify(new_list)


@app.route('/available-endtimes/<date>/<start_time>/<space>', methods=['GET'])
def get_available_endtimes(date, start_time, space):
    conn = get_db()
    item = ['08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00']
    new_list = []
    pre_list = []
    consecutive_times = []

    cursor = conn.cursor()

    date = datetime.datetime.strptime(date, '%Y-%m-%d').date()

    query = "SELECT DISTINCT endTime FROM booking_clone WHERE date = ? AND space = ?"
    cursor.execute(query, (date, space,))
    available_times = [str(row[0]) for row in cursor.fetchall()]

    new_list = [time for time in item if time not in available_times]

    start_time_initial = datetime.datetime.strptime(start_time, '%H:%M:%S')
    start_time = datetime.datetime.strptime(start_time, '%H:%M:%S')

    for i in range(len(new_list)):
        current_time = datetime.datetime.strptime(new_list[i], '%H:%M:%S')
        if current_time > start_time:
            pre_list.append(new_list[i])
            start_time = current_time

    for i in range(len(pre_list)):
        current_time = datetime.datetime.strptime(pre_list[i], '%H:%M:%S')
        time_diff = (current_time - start_time_initial).seconds
        if time_diff == 1800:  # Check if the time difference is 30 minutes (1800 seconds)
            consecutive_times.append(pre_list[i])
            start_time_initial = current_time
        else:
            break

    cursor.close()

    return jsonify(consecutive_times)


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
        conn = get_db()
        cursor = conn.cursor()

        # Delete the user with the given user_id from the 'users' table
        cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))

        # Check the row count to determine if the user was deleted
        if cursor.rowcount > 0:
            conn.commit()
            return jsonify({"success": True, "message": "User deleted successfully"})
        else:
            return jsonify({"success": False, "message": "User not found"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})


@app.route('/api/user', methods=['POST'])
def create_user():
    conn = get_db()
    data = request.get_json()
    print(data)
    fname = data.get('fname')
    lname = data.get('lname')
    email = 'ss@gmail.com'

    try:
        # Create a cursor object
        cursor = conn.cursor()

        # Insert the user data into the 'users' table
        cursor.execute("INSERT INTO users (fname, lname, email) VALUES (?, ?, ?)", (fname, lname, email))
        conn.commit()

        return jsonify({'success': True, 'message': 'User created successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})


@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        # Create a cursor object
        conn = get_db()
        cursor = conn.cursor()

        # Fetch all users from the 'users' table
        cursor.execute("SELECT * FROM users")
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
    app.run()
