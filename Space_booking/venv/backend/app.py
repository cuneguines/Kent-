from flask import Flask, jsonify, request
import json
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins='http://localhost:3000')
app = Flask(__name__)

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

   

@app.route('/api/data/<space>',methods=['GET'])
def get_data(space):
    cursor=conn.cursor()
   
    query="SELECT id,FORMAT(date, 'MM/dd/yy') AS date,name,startTime,endTime,Date_today,day FROM booking WHERE space =?;"
    cursor.execute(query, (space,))
    rows = cursor.fetchall()

    # Convert the data to a list of dictionaries
    data = []
    for row in rows:
        data.append({
            'id': row[0],
            'Date': row[1],
            'space': space,
            'name':row[2].strip(),
            'startTime':str(row[3]),
            'endTime':str(row[4]),
            'Date_today':row[5],
            'day':row[6].strip(),
            # Add more columns as needed
        })

    # Return the data as JSON
    return jsonify(data)
    
with open("bookings.json", 'r') as f:
    bookings = json.load(f)
cursor.close()
     
@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    return jsonify(bookings)


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
                insert_query=f"INSERT INTO booking (name, date, space,startTime,endTime,Date_Today,day) VALUES ('{name}', '{date}', '{space}','{current_time}','{next_time}','{date_Today}','{day}')"
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
    delete_query = f"DELETE FROM booking WHERE id = {booking_id}"
    
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
        query = "SELECT DISTINCT startTime FROM Booking WHERE space = ? and date=?"
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

# ...

if __name__ == '__main__':
    app.run()
