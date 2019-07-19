from flask import Flask, request, jsonify, render_template
import pymongo
import pprint
from pymongo import MongoClient
app = Flask(__name__)
client = MongoClient('localhost', 27017) 
db = client.test_db                                                                                  
coll = db.coll

@app.route('/insert', methods=['POST'])
def insert_docs():
  req = request.get_json()
  docs = [{"loc": {"type": "Point", "coordinates": coords}} for coords in req['coords']]
  coll.insert_many(docs)
  return jsonify({"result": "ok"})


@app.route('/points', methods=['GET'])
def get_points():
  docs = coll.find({}, {'_id': 0})
  return jsonify({"points": list(docs)})

@app.route('/cluster', methods=['POST'])
def cluster():
  req = request.get_json()
  clusters = req.get('clusters')
  clusters = int(req.get('k', 0)) if clusters is None else clusters
  pipeline = [
    {
      "$bucketGeo": {
        "groupBy": '$loc', 
        "centers": clusters, 
        "output": {"points": {"$push": '$loc' }}
      }
    }
  ]
  return jsonify({'results': list(coll.aggregate(pipeline))}) 

@app.route('/', methods=['GET'])
def home():
  return '<h3>home</h3>' 

@app.route('/demo', methods=['GET'])
def demo():
  return render_template('map.html')

@app.route('/drop', methods=['POST'])
def drop_coll():
  coll.drop()
  return jsonify({"result": "ok"})

if __name__ == '__main__':
  app.run()
