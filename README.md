# Backend = Server
# frontend = clinet
**#AI Service = Microservice to Launch AI Insights thaking data from the DB****
**Launching**:**
cd backend -> npm start
cd frontend -> npm start
pip install flask flask-cors python-dotenv pandas prophet pymongo

cd ai_service -> py forecast.py

To run the Personal Finance Tracker project, start by setting up the backend and frontend environments.
For the backend, ensure Python is installed, then install the required libraries (like `Flask`, `pymongo`, `prophet`, `pandas`, and `python-dotenv`).
Set up a `.env` file with your MongoDB connection details, and run the Flask server using `python app.py`.
For the frontend, use Node.js to install dependencies via `npm install`, then start the React application with `npm start`. 
Ensure both servers are running and properly connected for full functionality, including data visualization and AI-based forecasting.

**The Flask API runs typically at http://localhost:5001

**The React App runs at http://localhost:3000**

The React app fetches forecast data from the /predict endpoint of the Flask server.
**AI Service (Python Forecasting) :** Analyzes historical financial data to predict future spending trends.
Separating these concerns enables independent development, testing, and scaling of each layer.
A AI_Service part of this project is the Python AI module located in the ai_service/ directory. The file forecast.py contains code that analyzes historical expense data and predicts future spending trends. This functionality can help users make proactive budgeting decisions.
**Likely Approach:**
The model likely uses libraries like Pandas, NumPy, and Prophet or ARIMA to process time-series data. It loads historical expenses grouped by date and generates future values (e.g., for the next 30 days).
Key Functions:
•	Data Cleaning: Converts raw JSON/CSV into a structured time series.
•	Model Training: Fits a time series model on the historical data.
•	Prediction: Outputs a list of forecasted expenses with timestamps.
•	Integration: The forecast results are returned to the backend or saved to a file and visualized in the frontend using charts.

**Key Technologies Used**

Frontend :	React.js, HTML/CSS	UI rendering, routing, user input
Backend	: Node.js, Express.js	API services, data processing
Database:	MongoDB + Mongoose	Data storage and schema modeling
AI Module	: Python, Pandas, Prophet	Forecasting financial trends
Charting:	Chart.js	Data visualization in frontend
Communication :	REST API (JSON)	Frontend-Backend-AI integration

