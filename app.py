from flask import Flask, render_template, jsonify, redirect
<<<<<<< HEAD
=======
# from flask_pymongo import PyMongo
# import requests
# import datetime
>>>>>>> 36fe79a30f9fa50a0044a2a2384b0807ee6cb3d7

app = Flask(__name__)




@app.route('/')
def index():
    return render_template('index.html')


    
if __name__ == "__main__":
    app.run(debug=True)
