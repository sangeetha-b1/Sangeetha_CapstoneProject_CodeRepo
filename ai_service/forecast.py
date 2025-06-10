from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS 
from dotenv import load_dotenv
import pandas as pd
from prophet import Prophet
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
# Load from .env
MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DATABASE_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

@app.route("/predict", methods=["GET"])
def predict():
    data = list(collection.find({}))

    if not data:
        print("❌ No expense data found.")
        return jsonify({"error": "No expense data found"}), 404

    df = pd.DataFrame(data)

    if 'date' not in df or 'amount' not in df:
        print("❌ Missing required fields in data.")
        return jsonify({"error": "Missing required fields"}), 400

    print("✅ Data Sample:")
    print(df.head())

    df['ds'] = pd.to_datetime(df['date'])
    df['y'] = df['amount'].astype(float)

    model = Prophet()
    model.fit(df[['ds', 'y']])
    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)

    result = forecast[['ds', 'yhat']].tail(30).to_dict(orient='records')
    
    print("✅ Forecast Result:")
    print(result)

    return jsonify(result)


if __name__ == "__main__":
    app.run(port=5001)
