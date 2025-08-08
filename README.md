# Clash Royale Battle Analysis API

A **RESTful API** built with **Node.js**, **Express**, and **MongoDB** to interact with the official Clash Royale API.  
This application fetches player battle data, stores it locally, and provides detailed gameplay statistics.

---

## **Features**

- **Battle Log Fetch & Storage**  
  Retrieves a player's battle log from the Clash Royale API and stores it in MongoDB.

- **Player Statistics Analysis**  
  Calculates and returns detailed player stats including win rate, losses, draws, and deck performance analysis.

- **Clan Information**  
  Retrieves specific clan information directly from the Clash Royale API.

---

## **Tech Stack**

- **Node.js** – JavaScript runtime environment.
- **Express** – Web framework for building the API.
- **MongoDB** – NoSQL database for storing battle logs.
- **Mongoose** – ODM library for MongoDB.
- **Axios** – HTTP client for making API requests.
- **Dotenv** – Environment variable manager.

---

## **Prerequisites**

Before running this project, ensure you have installed:

- **Node.js** (v18 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local or hosted, e.g., MongoDB Atlas)

You will also need a valid **Clash Royale API key**.

---

## **Installation & Setup**

1. **Clone the repository**

   ```bash
   git clone https://github.com/vinimonteiro14/API_clash_royale
   cd API_clash_royale
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root directory with the following:

   ```env
   CLASH_ROYALE_API_KEY=YOUR_API_KEY
   MONGO_URI=YOUR_MONGODB_URI
   PORT=3000
   ```

4. **Start the server**

   ```bash
   npm start
   ```

   The server will run at:

   ```
   http://localhost:3000
   ```

---

## **API Endpoints**

### **Player Routes** `/api/players`

#### `GET /api/players/:playerTag/battlelog`

- **Description:** Fetches a player’s battle log from the Clash Royale API and stores it in the database.
- **Params:**
  - `playerTag` – The player’s tag (with or without `#`).
- **Example:**
  ```
  http://localhost:3000/api/players/2P8YQJUR/battlelog
  ```
- **Returns:** Array of battle log objects.

#### `GET /api/players/:playerTag/stats`

- **Description:** Calculates and returns detailed player stats based on stored battles.
- **Params:**
  - `playerTag` – The player’s tag (with or without `#`).
- **Example:**
  ```
  http://localhost:3000/api/players/2P8YQJUR/stats
  ```
- **Returns:** JSON object with:
  - `wins`
  - `losses`
  - `winRate`
  - `favoriteDeck`
  - `decks` (array with stats for each deck)

---

### **Clan Routes** `/api/clans`

#### `GET /api/clans/:clanTag`

- **Description:** Fetches clan information from the Clash Royale API.
- **Params:**
  - `clanTag` – The clan’s tag (with or without `#`).
- **Example:**
  ```
  http://localhost:3000/api/clans/2YQJRUJR/info
  ```
- **Returns:** JSON object with clan details.

---

## **Project Structure**

```
src/
 ├── controllers/    # Request & response handling
 ├── models/         # Mongoose schemas
 ├── routes/         # API endpoint definitions
 ├── services/       # Business logic & external API integration
app.js               # Express app configuration & routes
server.js            # Server initialization
```

---

## **License**

This project is licensed under the MIT License.
