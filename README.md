# **Clear Sphere App**

## **Description**
The **Clear Sphere App** is a web-based tool designed to provide users with real-time and historical air quality data. Users can input a location on the Home Page and be directed to the Results Page, where they can analyze pollutant-specific heatmaps, historical air quality trends, and other environmental insights. Additional pages include a Help Page with educational resources and an About Us Page detailing the purpose and team behind the project.

The app is designed to empower users with insights about air quality, enabling them to make informed decisions about their environment and health.

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

1. **Install Dependencies**:
  -First install nvm in order to install node.js
  -Install node using nvm install node
  -Then npm init to create 'package.json'
  -

2. **Set Up the Backend**:
   - Create a `index.js` file or use an existing Node.js server to handle API requests.
   -Install expressjs: npm install express
   -Install nodemon: npm install nodemon
   -Install supabase: npm install @supabase/supabase-js


---

### **Running the Application**

1. **Start the Frontend**:
   - Use vercel link to access webpage:
   - https://clear-sphere-git-main-javi-l03s-projects.vercel.app/


2. **Navigate the App**:
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


#### **1. Load login screen**
- **Endpoint**: `GET /`
- **Description**: Get the first page
- **Headers**:
  - None
- **Response**:
  - **Success (200)**:
    ```json
    { "success": true }
    ```
  - **Error (400)**:
    ```json
    { "error": "error" }
    ```

#### **2. Create a New User**
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

#### **3. Fetch All Users**
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
#### **4. Update user past searches and start and end dates**
- **Endpoint**: `PUT /update`
- **Description**: Updates user past searches and start and end dates in supabase
- **Request Body**:
  ```json
  {
    "id": "3",
    "location": "Houston",
    "start": "11/11/2024",
    "end": "11/12/2024"
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


