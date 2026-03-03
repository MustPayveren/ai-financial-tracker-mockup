# AI Financial Tracker (Mock-Up)

Frontend-only mock-up of an AI-powered financial tracker web app built with HTML, CSS, and JavaScript.

## Features
- Stub login flow (localStorage session)
- Signed-in user badge displayed in navbar
- Add income/expense transactions (stored in localStorage)
- Dynamic categories based on transaction type
- Dashboard: monthly summary (income, expenses, remaining)
- Budget progress bar (percentage of income spent)
- Recent transactions list
- Reports: spending by category (current month / last month)
- Automatic sorting by highest spending category
- Top spending category highlight
- Rule-based “AI Insights” that analyze spending patterns
- Quick actions:
  - Clear all data
  - Reseed demo data
  - Export transactions as JSON (stub)

## AI Logic (Rule-Based Simulation)

The application simulates intelligent financial analysis using JavaScript:

- Calculates monthly income and expenses
- Identifies highest spending category
- Detects over-budget situations
- Generates contextual budgeting suggestions
- Provides feedback based on spending percentage

No machine learning model is used. Insights are generated using structured rule-based logic.

## Data Handling

- No backend database implemented
- Transactions stored using browser localStorage
- Data persists between page reloads
- Reset and demo reseed functionality included

## How to Run (macOS)

From the project folder:

python3 -m http.server 8000

Then open your browser and go to:
http://localhost:8000

## Project Structure

- index.html — Welcome/Login
- dashboard.html — Overview, AI insights, progress visualization
- add.html — Add transaction form
- reports.html — Category totals and month toggle
- assets/styles.css — Application styling
- assets/app.js — Shared logic and AI simulation

## Notes

This project is a functional mock-up.  
No real backend or relational database is implemented.  
All data persistence is handled through browser localStorage for demonstration purposes.