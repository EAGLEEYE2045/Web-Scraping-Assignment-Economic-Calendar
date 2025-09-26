# Web-Scraping-Assignment-Economic-Calendar
Web scrapper

How to start the project:

#1 Start the Virtual server
python -m venv venv ( to make virtual server)
./venv/scripts/activate ( to init virtual server )

#2 Install all the requirements using 
pip install -r requirements.txt

#3 Start the the server using
uvicorn api:app --reload  

#4 Open another terminal to start frontend

#5 Navigate to your frontend folder
cd path\to\your\repo\economic-frontend

#6 Install dependencies
npm install

#7 Start the development server
npm start

NOTE: If you only wish to get csv file just run scraper file



For TASK SCHEDULER
## 🔄 Schedule Frontend to Run Every Day at 7 AM (Windows)

### Steps:
1. Open **Task Scheduler**  
   - Press `Win + R`, type `taskschd.msc`, and press **Enter**.  
   - Click **Create Basic Task...**

2. Name your task  
   Example: `Start Economic Frontend`.

3. Set the **trigger**  
   - Choose **Daily**.  
   - Set the start time to `7:00 AM`.

4. Set the **action**  
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

### ✅ Notes
- Ensure **Node.js** and **npm** are installed.  
- Replace `C:\path\to\economic-frontend` with the correct path on your machine.  
- Remove `-NoExit` if you don’t want the PowerShell window to stay open.  
- To log output, you can modify the command:
  ```powershell
  -NoExit -Command "cd 'C:\path\to\economic-frontend'; npm start *> log.txt 2>&1"
