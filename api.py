from fastapi import FastAPI
from scraper import scrape_economic_calendar
import threading, time
import asyncio, sys
from fastapi.middleware.cors import CORSMiddleware

if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.9:3000",  # your current frontend IP
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # allow only your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

latest_data = []

def background_scraper():
    global latest_data
    while True:
        try:
            latest_data = scrape_economic_calendar(save_csv=False)
            print(f"✅ Refreshed {len(latest_data)} events")
        except Exception as e:
            print("❌ Scraper failed:", e)
        time.sleep(600)  # refresh

# Start background thread when API starts
threading.Thread(target=background_scraper, daemon=True).start()

@app.get("/economic-calendar")
def get_economic_calendar():
    return {"count": len(latest_data), "events": latest_data}
