from flask import Flask, jsonify, request
import json
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins='http://localhost:3000')
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
import pyodbc
import datetime
from datetime import timedelta,datetime
# Establish a connection to the MSSQL database
conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=KPTSVSP;"
    "Database=SPACE_BOOKING;"
    "UID=sa;"
    "PWD=SAPB1Admin;"
)


import pyodbc





# Create a cursor
cursor = conn.cursor()
#Available times
from flask import Flask, jsonify
import json

app = Flask(__name__)



# Define the route for the API endpoint
@app.route('/api/user', methods=['GET'])
def get_user():
    cursor = conn.cursor()

    query = "SELECT fname, lname FROM users;"
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
    cursor.close()
    conn.commit()
    # Return the data as JSON
    return jsonify(data)

   

@app.route('/api/data/<space>',methods=['GET'])
def get_data(space):
    cursor=conn.cursor()
   
    query="SELECT id,FORMAT(date, 'MM/dd/yy') AS date,new_name,startTime,endTime,Date_today,day FROM booking_clone WHERE space ='{}'".format(space)
    cursor.execute(query)
    rows = cursor.fetchall()

    # Convert the data to a list of dictionaries
    data = []
    for row in rows:
        data.append({
            'id': row[0],
            'Date': row[1],
            'space': space,
            'name':row[2],
            'startTime':str(row[3]),
            'endTime':str(row[4]),
            'Date_today':row[5],
            'day':row[6].strip(),
            # Add more columns as needed
        })
    cursor.close()
    conn.commit()
    # Return the data as JSON
    return jsonify(data)
    

     
""" @app.route('/api/bookings', methods=['GET'])
def get_bookings():
    return jsonify(bookings) """


@app.route('/api/bookings', methods=['POST'])
def add_booking():
    #now = datetime.now()
    now=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data = request.get_json()
    print(data)
    name = data.get('name')
    date = data.get('date')
    space = data.get('space')
    startTime = data.get('startTime')
    endTime = data.get('endTime')
    date_Today =now
    day=data.get('day')



    start_time = datetime.strptime(startTime, '%H:%M:%S')
    end_time = datetime.strptime(endTime, '%H:%M:%S')

    cursor = conn.cursor()
    today = datetime.today().date()
    start_datetime = datetime.combine(today, start_time.time())
    end_datetime = datetime.combine(today, end_time.time())
    new_startTime=start_datetime
    new_endTime=end_datetime
    # Loop through the time difference and insert entries for each interval
    current_time = new_startTime
    while current_time < new_endTime:
                next_time = current_time + timedelta(minutes=30)  # Assuming each entry has a duration of 15 minutes
                
                # Calculate the difference between current time and next time
                difference = next_time - current_time
                insert_query=f"INSERT INTO booking_clone (new_name, date, space,startTime,endTime,Date_Today,day) VALUES ('{name}', '{date}', '{space}','{current_time}','{next_time}','{date_Today}','{day}')"
                # Insert a new booking entry into the database
                cursor.execute(insert_query)
                print(insert_query)
                current_time = next_time
    #insert_query = f"INSERT INTO booking (name, date, space,startTime,endTime,Date_Today,day) VALUES ('{name}', '{date}', '{space}','{startTime}','{endTime}','{date_Today}','{day}')"
   # print(insert_query)
    try:
        #cursor.execute(insert_query)
        conn.commit()
        return jsonify({'message': 'Booking created successfully'})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        
# API endpoint to delete a booking by ID
@app.route('/api/bookings/<booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    cursor = conn.cursor()
    delete_query = f"DELETE FROM booking_clone WHERE id = {booking_id}"
    
    try:
        cursor.execute(delete_query)
        conn.commit()
        return jsonify({'message': 'Booking deleted successfully'})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()




@app.route('/available-times/<date>/<space>', methods=['GET'])
def get_available_times(date,space):
    item = ['08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00']
    new_list = []

    cursor = conn.cursor()
    date = datetime.strptime(date, '%Y-%m-%d').date()  # Convert the date string to a datetime.date object
    try:
        today = datetime.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=6)

        # Perform your filtering query here
        query = "SELECT DISTINCT startTime FROM booking_clone WHERE space = ? and date=?"
        cursor.execute(query, (space,date,))  # Pass the date as a parameter

        available_times = [str(row[0]) for row in cursor.fetchall()]
        for element in item:
            if element not in available_times:
                new_list.append(element)
                
        return jsonify(new_list)  # Return a dictionary with the available times
    except Exception as e:
        print(e)
        return {'error': 'An error occurred'}  # Return an error message in a dictionary
    finally:
        cursor.close()



""" @app.route('/available-endtimes/<date>/<start_time>', methods=['GET'])
def get_available_endtimes(date, start_time):
    item = ['08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00']
    new_list = []

    cursor = conn.cursor()
    date = datetime.strptime(date, '%Y-%m-%d').date()  # Convert the date string to a datetime.date object
    try:
        # Perform your filtering query here
        query = "SELECT DISTINCT endTime FROM booking_clone WHERE date=?"
        cursor.execute(query, (date,))  # Pass the date as a parameter

        available_times = [str(row[0]) for row in cursor.fetchall()]
        for element in item:
            if element not in available_times:
                new_list.append(element)
        
        print(new_list)
        return jsonify(new_list)
       
    except Exception as e:
        print(e)
        return {'error': 'An error occurred'}  # Return an error message in a dictionary
    finally:
        cursor.close() """
""" @app.route('/available-endtimes/<date>/<start_time>', methods=['GET'])
def get_available_endtimes(date, start_time):
    print(start_time)
    new_list = ['12:00:00', '12:30:00', '14:30:00', '15:00:00', '17:00:00']

    if start_time not in new_list:
        return jsonify([])  # Start time not found, return an empty list

    consecutive_times = []
    start_index = new_list.index(start_time)

    for i in range(start_index + 1, len(new_list)):
        current_time = datetime.strptime(new_list[i], '%H:%M:%S')
        prev_time = datetime.strptime(new_list[i - 1], '%H:%M:%S')
        time_diff = (current_time - prev_time).seconds
        if time_diff == 1800:  # Check if the time difference is 30 minutes (1800 seconds)
            consecutive_times.append(new_list[i])
        else:
            break

    print(consecutive_times)

    return jsonify(consecutive_times)
 """

@app.route('/available-endtimes/<date>/<start_time>/<space>', methods=['GET'])
def get_available_endtimes(date, start_time,space):
    item = ['08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00']
    new_list = []
    pre_list=[]
    consecutive_times=[]
    cursor = conn.cursor()
    date = datetime.strptime(date, '%Y-%m-%d').date()  # Convert the date string to a datetime.date object

    try:
        # Perform your filtering query here
        query = "SELECT DISTINCT endTime FROM booking_clone WHERE date=? and space=?"
        cursor.execute(query, (date,space,))  # Pass the date as a parameter
        
        available_times = [str(row[0]) for row in cursor.fetchall()]
       
        new_list = [time for time in item if time not in available_times]
      
        
        
        start_time_initial=datetime.strptime(start_time, '%H:%M:%S')
        start_time=datetime.strptime(start_time, '%H:%M:%S')
        time_diff=0
        print(new_list)
        for i in range(len(new_list)):
                current_time = datetime.strptime(new_list[i], '%H:%M:%S')
                print(start_time)
                print(current_time)
                if current_time > start_time:
                   
                    pre_list.append(new_list[i])
                    print(time_diff)
                    start_time=current_time
                

        print(pre_list)
        print(start_time_initial)
        for i in range(len(pre_list)):
        
            current_time = datetime.strptime(pre_list[i], '%H:%M:%S')
            print(current_time)
            time_diff = (current_time - start_time_initial).seconds
            if time_diff == 1800:  # Check if the time difference is 30 minutes (1800 seconds)
                consecutive_times.append(pre_list[i])
                start_time_initial=current_time
                print(start_time_initial)
                print(time_diff)
            else:
                break
        print(consecutive_times)
        return jsonify(consecutive_times)

    except Exception as e:
        print(e)
        return jsonify({'error': 'An error occurred'})

    finally:
        cursor.close()
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
    finally:
        cursor.close()
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        # Create a cursor object
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
    app.run()
