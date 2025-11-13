const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const coursesRoutes = require("../routes/coursesRoutes");
const usersRoutes = require("../routes/usersRoutes"); // ✅ users route import করা হলো

const app = express();
const port = process.env.PORT || 4000;

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB URI
const uri =
  "mongodb+srv://onlinecourse:t6iz2UY6J5rJ8Qav@myserverdb.wwgfr6w.mongodb.net/?appName=MyServerDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ⚙️ MongoDB connect + routes setup
async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");

    // Database & Collections
    const db = client.db("courses_db");
    const courseCollection = db.collection("courses");
    const userCollection = db.collection("users"); // ✅ users collection

    // 🚀 Routes
    app.use("/courses", coursesRoutes(courseCollection));
    app.use("/users", usersRoutes(userCollection)); // ✅ users route use করা হলো

    // 🔍 Test route
    app.get("/", (req, res) => {
      res.send("Hello World! Server is running successfully 🚀");
    });
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
}

run().catch(console.dir);

// ▶️ Server start
app.listen(port, () => {
  console.log(`🌐 Server running on port ${port}`);
});
