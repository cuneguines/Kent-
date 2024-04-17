from database import db
 
# Declaring Model
class Job(db.Model):
    __tablename__ = "job"
 
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(150), unique=True, nullable=False)
    priority = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.current_timestamp())