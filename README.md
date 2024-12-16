# **Clear Sphere App**

## **Description**
The **Clear Sphere App** is a web-based tool designed to provide users with real-time and historical air quality data. Users can input a location on the Home Page and be directed to the Results Page, where they can analyze pollutant-specific heatmaps, historical air quality trends, and other environmental insights. Additional pages include a Help Page with educational resources and an About Us Page detailing the purpose and team behind the project.

The app is designed to empower users with actionable insights about air quality, enabling them to make informed decisions about their environment and health.

---

## **Target Browsers**
The Clear Sphere App is fully responsive and compatible with:
- **Mobile Browsers**: Safari (iOS), Chrome (Android).
- **Desktop Browsers**: Chrome, Edge, Safari.

---

## **Link to Developer Manual**
Jump directly to the [Developer Manual](#developer-manual).

---

## **Developer Manual**

### **Installation Instructions**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repository/clear-sphere-app.git
   cd clear-sphere-app
   ```

2. **Install Dependencies**:
   Ensure Node.js and npm are installed, then run:
   ```bash
   npm install
   ```

3. **Set Up the Backend**:
   - Create a `server.js` file or use an existing Node.js server to handle API requests.
   - Install required packages:
     ```bash
     npm install express body-parser dotenv
     ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add:
   ```plaintext
   OPENWEATHERMAP_API_KEY=16887fafcd130b5e54f78f627dbbb936
   ```

5. **Start the Backend Server**:
   ```bash
   node server.js
   ```

---

### **Running the Application**

1. **Start the Frontend**:
   - Use a local server (e.g., `Live Server` in VS Code) or deploy the app.
   - Open `HomePage.html` in a browser to start.

2. **Access the Backend**:
   Ensure the backend server is running locally or deployed.

3. **Navigate the App**:
   - Input a location on the Home Page to access the Results Page.
   - Use other pages like About Us, Help, Login, and Create Account for additional functionality.

---

### **Testing the Application**

1. **Run Unit Tests**:
   If tests are available, execute:
   ```bash
   npm test
   ```

2. **Test Features**:
   - Ensure heatmaps load properly with selected pollutants.
   - Verify graph functionality for different date ranges.
   - Test user account creation, login, and navigation between pages.

---

### **API Reference**

#### **1. Create a New User**
- **Endpoint**: `POST /user`
- **Description**: Creates a new user account in the system.
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "userName": "john_doe",
    "password": "securepassword123"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    { "success": true }
    ```
  - **Error (400)**:
    ```json
    { "error": "Invalid input" }
    ```

---

#### **2. Fetch All Users**
- **Endpoint**: `GET /users`
- **Description**: Retrieves a list of all registered users.
- **Headers**: None.
- **Request Body**: None.
- **Response**:
  - **Success (200)**:
    ```json
    [
      {
        "id": 1,
        "username": "john_doe",
        "user_password": "securepassword123"
      },
      {
        "id": 2,
        "username": "jane_smith",
        "user_password": "mypassword456"
      }
    ]
    ```

---

#### **3. User Authentication**
- **Endpoint**: `POST /auth`
- **Description**: Verifies user credentials and logs them into the system.
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "userName": "john_doe",
    "password": "securepassword123"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    { "authenticated": true, "redirect": "HomePage.html" }
    ```
  - **Error (401)**:
    ```json
    { "authenticated": false, "message": "Invalid username or password" }
    ```

---

#### **4. Fetch Geolocation Data**
- **Endpoint**: `GET /geo`
- **Description**: Fetches latitude and longitude for a user-provided location.
- **Query Parameters**:
  - `q` (string): The location name (e.g., "Miami").
- **Response**:
  - **Success (200)**:
    ```json
    {
      "lat": 40.7128,
      "lon": -74.0060
    }
    ```
  - **Error (404)**:
    ```json
    { "error": "Location not found" }
    ```

---

#### **5. Fetch Air Quality Data**
- **Endpoint**: `GET /air_pollution`
- **Description**: Retrieves air quality data for a specified location and date range.
- **Headers**: None.
- **Query Parameters**:
  - `lat` (float): Latitude of the location.
  - `lon` (float): Longitude of the location.
  - `start` (integer): Start date as a UNIX timestamp.
  - `end` (integer): End date as a UNIX timestamp.
- **Response**:
  - **Success (200)**:
    ```json
    {
      "location": "New York",
      "pollutants": {
        "no2": [12, 15, 14],
        "co": [0.7, 0.6, 0.8],
        "o3": [20, 22, 25],
        "pm2_5": [35, 40, 45]
      }
    }
    ```
  - **Error (400)**:
    ```json
    { "error": "Invalid parameters" }
    ```

---

### **Known Bugs**
- Heatmap occasionally doesn’t refresh after toggling pollutants.
- Intermittent API call failures due to rate limits from OpenWeatherMap.

---

### **Future Development**

1. **Upcoming Features**:
   - User profiles for saving preferred locations and settings.
   - Real-time alerts for hazardous air quality conditions.

2. **UI/UX Improvements**:
   - Add dark mode for better usability.
   - Improve responsiveness for smaller screens.

3. **Performance Enhancements**:
   - Optimize map rendering for older devices.
   - Cache API responses to reduce latency.

---

### **Directory Structure**
```
clear-sphere-app/
├── HomePage.html
├── Results.html
├── LoginPage.html
├── CreateAccountPage.html
├── HelpPage.html
├── AboutUs.html
├── results.js
├── Users.js
├── main.css
├── results.css
├── README.md
├── .env
```


