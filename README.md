# Portfolio Website for Selling Nature Photography

This project is a simple, elegant portfolio website designed to showcase and sell my nature photography. It serves as a digital gallery where visitors can view, appreciate, and purchase high-quality nature portraits. The website is built with **React.js** for the frontend, ensuring a smooth and interactive user experience, while **Node.js** handles the backend logic.

## Key Features:
- Display of stunning nature photography images.
- Clean, minimal design to keep the focus on the pictures.
- A simple, user-friendly interface for browsing and purchasing photos.
- Responsive design to ensure the website looks great on all devices.

This project is intended to enhance my portfolio and demonstrate my skills in frontend and backend web development.


## Website Sample Images 

### Homepage:
![Homepage](/d1_homepage.png)

### Signup page:
![signup](/d2_signup.png)

### Signin page:
![signin](/d3_signin.png)

### Photoslists without signin :
![unsigned photolist](/d4_photolists.png)

### Signed Homepage:
![Signed Homepage](/d5_homeLoged.png)

### Signed Photoslists :
![Signed Photoslist](/d6_photolists.png)

### Buy Photo:
![buyphoto](/d7_buyphoto.png)

### Razorpay access : 
![razorpay](/d8_razorpay.png)


## How to Set Up the Project:

### Prerequisites:
- Install [Node.js](https://nodejs.org/).
- Install [MongoDB](https://www.mongodb.com/try/download/community).
- Clone this repository from GitHub.

### Steps to Set Up:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/soumengope/NatureLens_sellingImage
   cd NatureLens_sellingImage
   ```

2. **Set Up the Backend:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` folder and add your MongoDB connection string:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     SECRETKEY=your secret key for session
     ROZORKEYID=use your rozorpay id
     ROZORSECRET=use your secret key
     ```
    - Install `nodemon` globally to enable live-reloading:
    ```bash
    npm install -g nodemon
    ```
   - Start the backend server:
     ```bash
     nodemon index.js
     ```

3. **Set Up the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   - Start the React development server:
     ```bash
     npm start
     ```

4. **View the Project:**
   Open your browser and navigate to `http://localhost:3000`.

### Project Structure:
- **Frontend:** Contains the React.js application.
- **Backend:** Contains the Node.js API server with the following collections in MongoDB:
  - `datas`: Stores images links and related datas.
  - `users`: Stores user information.
  - `sessions`: Manages user sessions.

### Notes:
- A `.gitignore` file is used to exclude sensitive files like `node_modules` and `.env` from being tracked in version control.
- Ensure MongoDB is running locally or provide a hosted MongoDB connection string in the `.env` file.

Feel free to reach out for any questions or issues! 
