# Web-Scraping-Assignment-Economic-Calendar
Web scrapper

How to start the project:

#1 Start the Virtual server
python -m venv venv ( to make virtual server)
./venv/scripts/activate ( to init virtual server )

2# Install all the requirements using 
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
