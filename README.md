# WeatherForecast
# Weather App

## Introduction
The Weather App allows users to check the current weather and forecast for a given city or their current location. The app fetches weather data from the OpenWeatherMap API and displays it in a user-friendly interface. Users can view real-time weather information, including temperature, humidity, and weather conditions, along with a 5-day forecast.

---

## Features
- Search for weather by city name or use the current location.
- Display current weather with details like temperature, humidity, and description.
- View a 5-day weather forecast with icons and temperatures.
- Toggle between Celsius and Fahrenheit units.
- Clear search history and previous weather queries.
- Responsive design for both desktop and mobile screens.

---

## Technologies Used
- **Frontend:** React.js, CSS
- **API:** OpenWeatherMap API for fetching weather data
- **CSS Framework:** Custom styles for responsive design
- **Others:** React Hooks, Local Storage for history

## Live Demo
You can check out the live demo of the Weather App here:
[Weather App - Visit Website](https://your-deployed-app-link.com)

---

## How to Run the App Locally

### Installation
1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/sakshi1703/WeatherForecast
    cd weather-app
    ```

2. Install the required dependencies:
    ```bash
    npm install axios
    ```

3. Obtain your API key from OpenWeatherMap:
    - Go to [OpenWeatherMap API](https://openweathermap.org/).
    - Create an account and generate an API key.

4. Add your API key to the `.env` file (create one if it doesn't exist):
    ```bash
    REACT_APP_OPENWEATHER_API_KEY= 28b59eaa55240651297c21f0f88e5729;
    ```

5. Run the application:
    ```bash
    npm run dev
    ```

6. Open your browser and go to [http://localhost:5173/](http://localhost:5173/) to view the app.

---

## Features Walkthrough
- **Search by City**: Users can input the name of a city in the search bar and see the current weather and forecast.
- **Use Current Location**: The app can fetch the user's location and display weather information based on it.
- **Unit Toggle**: Toggle between Celsius and Fahrenheit for temperature.
- **History**: The app stores past search locations and allows users to view or clear the search history.
- **Forecast**: A 5-day weather forecast is displayed with icons and temperatures.

---

## Code Structure
```bash
.
weather-app/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.js
├── package.json
├── package-lock.json
└── .gitignore 
```
---

## How the App Works

**Weather Fetching**
When a user searches for a city or uses their current location, the app makes an API request to OpenWeatherMap using the provided API key.
The current weather and forecast data are then displayed in the app.

**Unit Conversion**
Users can toggle between Celsius and Fahrenheit. This is done by adjusting the temperature units used in the API request and updating the UI accordingly.

**Search History**
The app stores previous search queries in the browser's local storage. Users can click on an item from the history to quickly view past weather data.

**Mobile-First Design**
The app is responsive and adjusts its layout to ensure the UI is user-friendly on both desktop and mobile devices.

## Screenshots
## Screenshots

### Main Weather Screen:
![Main Weather Screen](../weather_app/src/assets/main_weather_screen.png)

### 5-Day Forecast:
![5-Day Forecast](../weather_app/src/assets/5Day_forecast.png)

### Search History:
![Search History](../weather_app/src/assets/history.png)
