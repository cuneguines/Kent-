from flask import Flask, jsonify, request
import json
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins='http://localhost:3000')
app = Flask(__name__)

import pyodbc

# Establish a connection to the MSSQL database
conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=KPTSVSP;"
    "Database=KENTSTAINLESS;"
    "UID=sa;"
    "PWD=SAPB1Admin;"
)


import pyodbc





# Create a cursor
cursor = conn.cursor()


@app.route('/api/data',methods=['GET'])
def get_data():
    cursor.execute("SELECT * FROM OHEM")
    rows = cursor.fetchall()

    # Convert the data to a list of dictionaries
    data = []
    for row in rows:
        data.append({
            'id': row[0],
            'name': row[1],
            'age': row[2],
            # Add more columns as needed
        })

    # Return the data as JSON
    return jsonify(data)
    
with open('bookings.json') as f:
    bookings = json.load(f)
   
@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    return jsonify(bookings)


@app.route('/api/bookings', methods=['POST'])
def add_booking():
    new_booking = request.get_json()
    bookings.append(new_booking)
    # Save updated bookings to JSON file
    with open('bookings.json', 'w') as f:
        json.dump(bookings, f, indent=4)
    return jsonify(new_booking)


if __name__ == '__main__':
    app.run()
