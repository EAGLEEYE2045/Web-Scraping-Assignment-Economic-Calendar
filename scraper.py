import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def scrape_economic_calendar(save_csv: bool = False):
    url = "https://www.investing.com/economic-calendar/"

    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_experimental_option("excludeSwitches", ["enable-logging"])
    driver = webdriver.Chrome(options=options)

    driver.get(url)

    try:
        # Accept cookies popup if it appears
        try:
            WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.ID, "onetrust-accept-btn-handler"))
            ).click()
        except:
            pass  

        # Click "This Week" tab
        WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "timeFrame_thisWeek"))
        ).click()

        time.sleep(3)

        # Scroll until fully loaded
        last_height = driver.execute_script("return document.body.scrollHeight")
        while True:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        # Locate calendar table
        table = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.ID, "economicCalendarData"))
        )
        rows = table.find_elements(By.TAG_NAME, "tr")

        data = []
        for row in rows:
            cols = row.find_elements(By.TAG_NAME, "td")
            if len(cols) < 7:
                continue

            time_ = cols[0].text.strip()
            currency = cols[1].text.strip()
            impact = cols[2].get_attribute("title") or cols[2].text.strip()

            # Event name + link
            event_link_elem = cols[3].find_element(By.TAG_NAME, "a")
            event = event_link_elem.text.strip()
            event_link = event_link_elem.get_attribute("href")

            actual = cols[4].text.strip()
            forecast = cols[5].text.strip()
            previous = cols[6].text.strip()

            data.append({
                "Time": time_,
                "Currency": currency,
                "Impact": impact,
                "Event": event,
                "Event_Link": event_link,
                "Actual": actual,
                "Forecast": forecast,
                "Previous": previous
            })

        # Save to CSV if requested
        if save_csv:
            df = pd.DataFrame(data)
            df.to_csv("economic_calendar.csv", index=False, encoding="utf-8-sig")
            print(f"✅ Saved {len(data)} rows with event links to economic_calendar.csv")

        return data

    finally:
        driver.quit()


if __name__ == "__main__":
    events = scrape_economic_calendar(save_csv=True)
    print(f"Scraped {len(events)} events.")
