const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const coursesRoutes = require("../routes/coursesRoutes");
const usersRoutes = require("../routes/usersRoutes");
const purchaseRoutes = require("../routes/purchaseRoutes");

const app = express();
const port = process.env.PORT || 4000;

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB URI (এটি environment variable থেকে নিন)
const uri = process.env.MONGODB_URI || 
  "mongodb+srv://onlinecourse:t6iz2UY6J5rJ8Qav@myserverdb.wwgfr6w.mongodb.net/?appName=MyServerDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ⚙️ MongoDB connect + routes setup
let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }
  
  try {
    await client.connect();
    isConnected = true;
    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.error("❌ Database connection error:", err);
    throw err;
  }
}

// Database & Collections
const db = client.db("courses_db");
const courseCollection = db.collection("courses");
const userCollection = db.collection("users");
const purchaseCollection = db.collection("purchases");

// 🚀 Routes
app.use("/courses", coursesRoutes(courseCollection));
app.use("/users", usersRoutes(userCollection));
app.use("/purchases", purchaseRoutes(purchaseCollection));

// 🆕 Latest courses route
app.get("/latest-courses", async (req, res) => {
  try {
    await connectDB();
    const latestCourses = await courseCollection
      .find({})
      .sort({ _id: -1 })
      .limit(6)
      .toArray();

    res.send(latestCourses);
  } catch (error) {
    console.error("Error fetching latest courses:", error);
    res.status(500).send({ message: "Failed to fetch latest courses" });
  }
});

// 🔍 Test route
app.get("/", (req, res) => {
  res.send("Hello World! Server is running successfully 🚀");
});

// 🔥 Initialize DB connection
connectDB();

// 📤 Export the app for Vercel
module.exports = app;