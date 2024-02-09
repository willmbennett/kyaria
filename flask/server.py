import pprint
from flask import Flask, jsonify
# from pymongo import MongoClient
# from os import environ

app = Flask(__name__)

# Get MongoDB URI from environment variable
# MONGODB_URI = environ.get('MONGODB_URI')
# client = MongoClient(MONGODB_URI)

# Assuming your MongoDB database is named 'test'
# db = client['test']

@app.route("/flask/test", methods=['GET'])
def hello_world():
    pprint.pprint('Made it here')
    # collection = db.people
    # person1 = collection.find_one()

    # Ensure you're returning JSON-serializable data
    # person1 = person1 if person1 else {}
    return jsonify({'message': 'made it to flask test'})

if __name__ == "__main__":
    app.run(debug=True)
