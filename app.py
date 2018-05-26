from flask import Flask, render_template, jsonify, redirect
# from flask_pymongo import PyMongo
# import requests
# import datetime

# create instance of flask app
app = Flask(__name__)


# mongo = PyMongo(app)



@app.route('/')
def index():
    return render_template('index.html')


# @app.route("/stocks/<stockInput>", methods=['GET'])
# #url = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,chart&range=2y&last=5`;
# #request
# def stocks(stockInput):
#     print("/n----------------------------------------------")    
#     print('stockInput',stockInput)
#     urlroute = f'https://api.iextrading.com/1.0/stock/{stockInput}/batch?types=quote,news,chart&range=2y&last=5'
#     print('urlroute:', urlroute)
#     r= requests.get(urlroute)
#     response_json = r.json()
#     print(response_json)
#     #close_value = response_json.quote.close;
#     #open_value = response_json.quote.open;
#     close_value = response_json['quote']['close'];
#     open_value = response_json['quote']['open']
#     print(response_json['quote']['open'])
#     print('close_value',close_value)
#     print('open_value', open_value)
#     print('stockInput',stockInput)

#     stock = mongo.db.stock

#     stock_data = {}

#     ticker_s = stockInput
#     stock_data["ticker_s"] = ticker_s
#     print(stock_data["ticker_s"])
#     m_now = datetime.datetime.now() 
#     stock_data["sdate"] = m_now   

#     stock_data["close_value"] = close_value
#     stock_data["open_value"] = open_value
#     print(stock_data["sdate"])
#     print(stock_data["close_value"])
#     print(stock_data["open_value"])

#     stock.insert({"ticker_s":stock_data["ticker_s"],"close_value":stock_data["close_value"],"open_value":stock_data["open_value"],"sdate":stock_data["sdate"]})



#     return jsonify({'response':'Success'}) 
#     #return redirect("http://localhost:5000/", code=302)   
    
if __name__ == "__main__":
    app.run(debug=True)
