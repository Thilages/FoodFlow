import pandas as pd
from flask import Flask, request, jsonify
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
import numpy as np
import joblib
from flask_cors import CORS


# Load saved models
model_sales = joblib.load('model_sales.pkl')
model_covers = joblib.load('model_covers.pkl')

# Create Flask app
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Ensure required keys exist
        required_keys = ['apparent_temperature', 'humidity', 'precip_intensity_max', 'precip_max_time', 'summary', 'recent_30_days']
        if not all(key in data for key in required_keys):
            return jsonify({'error': 'Missing required data'}), 400

        # Convert the input JSON to a DataFrame
        df = pd.DataFrame([data])
        sales_pred = model_sales.predict(df)[0]  # Predicted value as a float or int
        covers_pred = model_covers.predict(df)[0]
        # Make predictions using the loaded models
        sales_pred = round(float(sales_pred), 2)  # Ensure it's a float before rounding
        covers_pred = round(float(covers_pred), 0)

        return jsonify({'inside_sales': sales_pred, 'inside_covers':covers_pred})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/upload', methods=['POST'])
def upload():
    dd = request.json
    print(dd)
    return jsonify({"status": "success"})

# Expose the app via ngrok



# Run the Flask app
if __name__ == '__main__':
    app.run(port=5000)
