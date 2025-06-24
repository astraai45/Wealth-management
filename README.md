# Wealth-management

Here’s a `README.md` file for your wealth-related project. You can modify or expand it based on any additional features or specifics you’d like to highlight.

````markdown
# Wealth AI Project

This project uses machine learning and AI to predict loan risk levels based on user input. The backend is built with Flask, and the frontend is a React application. It also features a chat functionality powered by Ollama's TinyLlama model.

## Features

- **Loan Risk Prediction:** A decision tree model is used to predict the risk level (Low, Medium, High) based on user-provided data like marital status, income, and other financial metrics.
- **AI Chatbot:** An interactive chatbot using Ollama's TinyLlama model, allowing users to ask questions and get AI-generated responses.
- **Frontend:** A React application with multiple routes, including:
  - **Home:** The landing page.
  - **Maps:** A page for displaying financial-related maps (if implemented).
  - **Chat:** The interactive AI chatbot.
  - **Predictor:** A form where users can input their data and get a loan risk prediction.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

- Python 3.x
- Node.js and npm
- Flask
- React
- Ollama (for AI chatbot functionality)
- Scikit-learn (for machine learning model)

### Backend Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/wealth-ai.git
   cd wealth-ai/backend
````

2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Make sure you have `ollama` installed to run the chatbot model. You can install it via the official instructions from Ollama.

5. Run the Flask backend:

   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd wealth-ai/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

### Usage

* Visit `http://localhost:3000` to access the React app.
* Use the **Predictor** page to input your data and get the loan risk prediction.
* Use the **Chat** page to interact with the AI-powered chatbot.

## Contributing

We welcome contributions to improve the project! If you'd like to contribute, follow these steps:

1. Fork the repository
2. Clone your forked repository
3. Create a new branch for your changes
4. Make your changes and commit them
5. Push your changes to your forked repository
6. Open a pull request to the original repository

### Contributors

* [Madhav Kagolanu](https://github.com/Madhavkagolanu)
* [Pavan Balaji](https://github.com/pavanbalaji45)

