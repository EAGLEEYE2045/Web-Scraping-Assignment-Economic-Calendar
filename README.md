# 📊 Web-Scraping-Assignment-Economic-Calendar

A **Web Scraper + Frontend** project to extract and visualize economic calendar data.  
This project consists of two main parts:
1. **Backend** (FastAPI for scraping and API serving)
2. **Frontend** (React app for displaying data)

---

## 🚀 Getting Started

### 1️⃣ Backend Setup
1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the environment:
   - **Windows**:
     ```bash
     ./venv/Scripts/activate
     ```
   - **Mac/Linux**:
     ```bash
     source venv/bin/activate
     ```

3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn api:app --reload
   ```

---

### 2️⃣ Frontend Setup
1. Open a **new terminal**.

2. Navigate to the frontend directory:
   ```bash
   cd path/to/your/repo/economic-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the React development server:
   ```bash
   npm start
   ```

---

### ⚡ CSV Only (Without Frontend)
If you only need the **CSV file**, simply run the scraper file:
```bash
python scraper.py
```

---

## 🕒 Task Scheduler Setup (Windows)

### 🔄 Schedule Frontend to Run Every Day at 7 AM

1. Open **Task Scheduler**  
   - Press `Win + R`, type `taskschd.msc`, and press **Enter**.  
   - Click **Create Basic Task...**

2. Name your task  
   Example: `Start Economic Frontend`.

3. Set the **Trigger**  
   - Choose **Daily**.  
   - Set the start time to `7:00 AM`.

4. Set the **Action**  
   - Choose **Start a program**.  
   - In **Program/script**, enter:
     ```powershell
     powershell.exe
     ```
   - In **Add arguments**, enter (replace with your project path):
     ```powershell
     -NoExit -Command "cd 'C:\path\to\economic-frontend'; npm start"
     ```

5. Finish setup  
   - Click **Finish**.  
   - Right-click your task → **Run** to test.

---

## ✅ Notes
- Ensure **Node.js** and **npm** are installed.  
- Replace `C:\path\to\economic-frontend` with the correct path on your machine.  
- Remove `-NoExit` if you don’t want the PowerShell window to remain open.  
- To log output, you can modify the command:
  ```powershell
  -NoExit -Command "cd 'C:\path\to\economic-frontend'; npm start *> log.txt 2>&1"
  ```

---

## 🛠️ Tech Stack
- **Backend:** Python, FastAPI, Uvicorn  
- **Frontend:** React, Node.js  
- **Task Scheduling:** Windows Task Scheduler  

---
✨ Happy Scraping & Visualizing!
