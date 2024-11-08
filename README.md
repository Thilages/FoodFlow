

# FoodFlow: AI-based Sales Prediction System  

![{0D526B9A-3948-4AC3-A099-1A1F0F29222E}](https://github.com/user-attachments/assets/1345cc20-6288-44fb-baeb-28d661073e62)

**FoodFlow** is a web application designed to monitor food waste and provide sales predictions using AI. The application is built with a **React** frontend (using Vite) and a **Flask** backend. It helps businesses manage food inventory more efficiently by predicting sales and minimizing waste.

![{B4BDA84C-EF27-4B5D-8F1F-E61423E2D883}](https://github.com/user-attachments/assets/650e2ef5-cd0c-4166-906e-2e2c7e4af88c)


## Features

- **Food Waste Monitoring**: Track food waste in real-time.
- **AI-based Sales Prediction**: Predict future sales based on historical data.
- **User-Friendly Interface**: Built with **React** and optimized for performance.
- **Backend API**: Flask-based server handling the AI logic and data management.
  
## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Flask, Python

---

## Installation

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for running the frontend React app)
- [Python](https://www.python.org/downloads/) (for running the backend Flask server)
- [pip](https://pip.pypa.io/en/stable/) (for managing Python dependencies)

### Setting Up the Project

#### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Thilages/FoodFlow.git
cd FoodFlow
```

#### 2. Set up the Backend (Flask API)

1. Navigate to the `FoodFlowBackend/` directory:

   ```bash
   cd FoodFlowBackend
   ```

2. Create and activate a virtual environment:

   - **On macOS/Linux**:

     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

   - **On Windows**:

     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```

3. Install the Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:

   ```bash
   python app.py
   ```

   The Flask backend should now be running on [http://localhost:5000](http://localhost:5000).

#### 3. Set up the Frontend (React + Vite)

1. Navigate to the `FoodFlowFrontend/` directory:

   ```bash
   cd ../FoodFlowFrontend
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

   The frontend should now be running on [http://localhost:3000](http://localhost:3000).

---

## Usage

Once both the frontend and backend are running, you can start using the application:

1. Open your browser and go to [http://localhost:3000](http://localhost:3000).
2. Monitor food waste data and interact with the AI-based sales prediction features.

---

## API Documentation (Backend)

The Flask backend exposes several endpoints to interact with the system:

### `GET /api/sales-prediction`

- **Description**: Get the predicted sales data for the next week/month.
- **Response**: A JSON object containing the predicted sales values.

Example request:

```bash
curl -X GET http://localhost:5000/api/sales-prediction
```

