from flask import Flask, render_template, jsonify, redirect, request
from flask_pymongo import PyMongo
import requests

<<<<<<< HEAD
import datetime
import time  
=======
import datetime  
>>>>>>> fa9a74430ab3b19a383be8629e346e2489b8bfda

# create instance of Flask app
app = Flask(__name__)

mongo = PyMongo(app)

#  create route that renders index.html template
#@app.route("/")
#def index():
 #   stock = mongo.db.stock
    
  #  return jsonify({'response':'Success'})#render_template("index.html", stock=stock)



@app.route('/')
def index():
    return render_template('index.html')

<<<<<<< HEAD
@app.route("/history")
def history():
    print('History data')
    #stock = mongo.db.stock.find()

    stock = list(mongo.db.stock.find())
    print(stock)
    return render_template('index2.html', stock=stock)
    
@app.route("/stocks/<stockInput>", methods=['GET'])
def stocks(stockInput):
    print('stockInput',stockInput)

    urlroute = f'https://api.iextrading.com/1.0/stock/{stockInput}/batch?types=quote,news,chart&range=2y&last=5'

    r= requests.get(urlroute)
    response_json = r.json()
    print(response_json)

    close_value = response_json['quote']['close'];
    open_value = response_json['quote']['open']
    company_name = response_json['quote']['companyName']
    print(response_json['quote']['open'])
    #print('company_name',company_name)
    
=======
@app.route("/stocks/<stockInput>", methods=['GET'])
#url = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,chart&range=2y&last=5`;
#request
def stocks(stockInput):
    print("/n----------------------------------------------")    
    print('stockInput',stockInput)
    urlroute = f'https://api.iextrading.com/1.0/stock/{stockInput}/batch?types=quote,news,chart&range=2y&last=5'
    print('urlroute:', urlroute)
    r= requests.get(urlroute)
    response_json = r.json()
    print(response_json)
    #close_value = response_json.quote.close;
    #open_value = response_json.quote.open;
    close_value = response_json['quote']['close'];
    open_value = response_json['quote']['open']
    print(response_json['quote']['open'])
    print('close_value',close_value)
    print('open_value', open_value)
    print('stockInput',stockInput)

>>>>>>> fa9a74430ab3b19a383be8629e346e2489b8bfda
    stock = mongo.db.stock

    stock_data = {}

    ticker_s = stockInput
    stock_data["ticker_s"] = ticker_s
<<<<<<< HEAD
    
=======
    print(stock_data["ticker_s"])
>>>>>>> fa9a74430ab3b19a383be8629e346e2489b8bfda
    m_now = datetime.datetime.now() 
    stock_data["sdate"] = m_now   

    stock_data["close_value"] = close_value
    stock_data["open_value"] = open_value
<<<<<<< HEAD
    stock_data["company_name"] = company_name
    
    today = time.strftime("%m/%d/%Y")
    today_format = datetime.datetime.strptime(today, "%m/%d/%Y")
    #print (today_format)
    
    exp_date = str(today_format + datetime.timedelta(days=365)).split(" ")
    ddate = exp_date[0]
    print (ddate)

    stock_data["ddate"] = ddate 
    stock.insert({"ticker_s":stock_data["ticker_s"],"company_name":stock_data["company_name"],"close_value":stock_data["close_value"],"open_value":stock_data["open_value"],"ddate":stock_data["ddate"],"sdate":stock_data["sdate"]})
    
=======
    print(stock_data["sdate"])
    print(stock_data["close_value"])
    print(stock_data["open_value"])

    stock.insert({"ticker_s":stock_data["ticker_s"],"close_value":stock_data["close_value"],"open_value":stock_data["open_value"],"sdate":stock_data["sdate"]})


>>>>>>> fa9a74430ab3b19a383be8629e346e2489b8bfda

    return jsonify({'response':'Success'}) 
    #return redirect("http://localhost:5000/", code=302)   

<<<<<<< HEAD
=======


>>>>>>> fa9a74430ab3b19a383be8629e346e2489b8bfda
if __name__ == "__main__":
    app.run(debug=True)