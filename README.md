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

The React App runs at http://localhost:3000

The React app fetches forecast data from the /predict endpoint of the Flask server.**
