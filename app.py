from flask import Flask
import pymongo
import pprint
from pymongo import MongoClient
app = Flask(__name__)

@app.route('/')
def insert_docs():
    client = MongoClient('localhost', 27017)                                                             
    db = client.test_db                                                                                  
    test_db = db.test_db  
    arr = [{"loc":{"type":"Point","coordinates":[166.49648,9.50527]}},                                        
  {"loc":{"type":"Point","coordinates":[17.50159,1.49465]}},                                         
  {"loc":{"type":"Point","coordinates":[113.31974,-17.41322]}},                                      
  {"loc":{"type":"Point","coordinates":[41.05421,88.15977]}},                                        
  {"loc":{"type":"Point","coordinates":[26.96417,-24.98615]}},                                       
  {"loc":{"type":"Point","coordinates":[-86.03212,43.68186]}},                                       
  {"loc":{"type":"Point","coordinates":[-18.90904,-47.03336]}},                                      
  {"loc":{"type":"Point","coordinates":[72.69048,-25.54109]}},                                       
  {"loc":{"type":"Point","coordinates":[-3.26817,-55.29351]}},                                       
  {"loc":{"type":"Point","coordinates":[122.80319,70.63456]}},                                       
  {"loc":{"type":"Point","coordinates":[84.2942,17.74984]}},                                         
  {"loc":{"type":"Point","coordinates":[-132.08705,67.96762]}},                                      
  {"loc":{"type":"Point","coordinates":[-165.63364,-87.74684]}},                                     
  {"loc":{"type":"Point","coordinates":[-155.90845,-89.48737]}},                                     
  {"loc":{"type":"Point","coordinates":[1.76578,64.00543]}},                                         
  {"loc":{"type":"Point","coordinates":[-23.28548,-29.70363]}},                                      
  {"loc":{"type":"Point","coordinates":[74.43515,-51.33427]}},                                       
  {"loc":{"type":"Point","coordinates":[-3.00381,36.23858]}},                                        
  {"loc":{"type":"Point","coordinates":[-48.02278,14.93719]}},                                       
  {"loc":{"type":"Point","coordinates":[62.02507,26.67068]}}]
    test_db = test_db.insert_many(arr)
    test_docs = db.test_db
    arr_docs = []
    for doc in test_docs.find():
        arr_docs.append(pprint.pformat(doc))
    return str(arr_docs)
if __name__ == '__main__':
    app.run()
