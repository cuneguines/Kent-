from flask import Flask, render_template
from database import db

# create the application object
app = Flask(__name__)
app.app_context()

db_name = 'vehicle.db'

# Configuring SQLite Database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name
 
# Suppresses warning while tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
 
# Initialising SQLAlchemy with Flask App
db.init_app(app)

@app.route('/')
def display_jobs():
    with app.app_context():
        # Retrieve all jobs from the database using db.session.query
        jobs = db.session.query(Job).all()
        print(jobs)

        # Render a template with the job data
        return render_template('static.html', jobs=jobs)

@app.get('/api')

    
@app.route('/static')
def home():
    return "Hello, World!" 

# start the server with the 'run()' method
if __name__ == '__main__':
    app.run()