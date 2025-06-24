from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os
import subprocess

app = Flask(__name__)
CORS(app)

# Load the trained Decision Tree model
with open(r"C:\React\wealth-ai\backend\loan_risk_model.pkl", "rb") as file:
    model = pickle.load(file)

# Marital status mapping (for categorical encoding)
marital_status_map = {"Single": 0, "Married": 1, "Divorced": 2, "Widowed": 3}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    
    # Convert categorical data to numerical
    data["Marital_Status"] = marital_status_map[data["Marital_Status"]]
    
    # Convert input to DataFrame
    input_df = pd.DataFrame([data])

    # Predict the risk level
    prediction = model.predict(input_df)[0]

    # Map prediction to labels
    risk_labels = {0: "Low", 1: "Medium", 2: "High"}
    
    return jsonify({"prediction": risk_labels[prediction]})


def get_ollama_response(question: str) -> str:
    try:
        print(f"Sending question to TinyLlama: {question}")
        command = ['ollama', 'run', 'tinyllama:latest', question]
        result = subprocess.run(command, capture_output=True, text=True, check=True, encoding='utf-8')
        response = result.stdout.strip()
        print(f"Ollama response: {response}")
        return response
    except subprocess.CalledProcessError as e:
        print(f"Error interacting with Ollama: {e}")
        return None

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"reply": "Please enter a message."})

    bot_reply = get_ollama_response(user_message)

    return jsonify({"reply": bot_reply})   

if __name__ == "__main__":
    app.run(debug=True)
