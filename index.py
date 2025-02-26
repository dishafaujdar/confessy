from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://confess_user:remote1111@localhost:5432/confession_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Move the model definition **above** db.create_all()
class Confession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

# Ensure tables are created
with app.app_context():
    db.create_all()

@app.route("/confess", methods=["POST"])
def confess():
    data = request.json  # Get JSON from request
    new_confession = Confession(name=data["name"], message=data["message"])
    
    db.session.add(new_confession)
    db.session.commit()
    
    return jsonify({"message": "Confession added!"}), 201


@app.route("/confessions", methods=["GET"])
def get_confessions():
    confessions = Confession.query.all()
    return jsonify([
        {"id": c.id, "name": c.name, "message": c.message}
        for c in confessions
    ])

# Insert a test confession **after** db.create_all()
with app.app_context():
    if not Confession.query.first():  # Check if any confession exists
        new_confession = Confession(name="John", message="I love pizza!")
        db.session.add(new_confession)
        db.session.commit()

# Print confessions to verify data exists
with app.app_context():
    confessions = Confession.query.all()
    for confession in confessions:
        print(confession.id, confession.name, confession.message)

if __name__ == "__main__":
    app.run(debug=True)
