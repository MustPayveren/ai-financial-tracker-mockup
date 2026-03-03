# AI Financial Tracker (Mock-Up)

Frontend-only mock-up of an AI-powered financial tracker web app built with HTML, CSS, and JavaScript.

## Features
- Stub login flow (localStorage session)
- Add income/expense transactions (stored in localStorage)
- Dashboard: monthly summary + recent transactions
- Reports: spending by category + month toggle
- “AI Insights” (rule-based) that highlights top spending category and basic budgeting tips

## How to Run (macOS)

From the project folder:

python3 -m http.server 8000

Then open your browser and go to:
http://localhost:8000

## Project Structure

- index.html — Welcome/Login
- dashboard.html — Overview + insights
- add.html — Add transaction form
- reports.html — Category totals
- assets/ — CSS and shared JavaScript

## Notes

This project is a mock-up. No real backend or database is implemented.
Data is stored in browser localStorage for demonstration purposes.