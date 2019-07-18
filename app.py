from flask import Flask, request, jsonify
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


@app.route('/points')
def get_points():
  docs = coll.find({}, {'_id': 0})
  return jsonify({"points": list(docs)})

@app.route('/cluster')
def cluster():
  clusters = request.args.get('clusters')
  clusters = int(request.args.get('n')) if clusters is None else clusters
  pipeline = [{"$bucketGeo": {"groupBy": '$loc', "centers": clusters, "output": {"points": {"$push": '$loc' }}}}]
  return jsonify({'results': list(coll.aggregate(pipeline))}) 

if __name__ == '__main__':
  app.run()
