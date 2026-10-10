// src/index.ts
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

console.log("SHIVA MOTORS SERVER BOOTING...");

const mongoURI = process.env.MONGO_URI || "";

// Safety check to prevent crashes if DB string is missing
if (mongoURI) {
    mongoose.connect(mongoURI)
        .then(() => console.log("MongoDB successfully connected!"))
        .catch((err) => console.error("CRASH [MongoDB Connection Error]:", err));
} else {
    console.log("WARNING: No MONGO_URI found in environment variables. Running without DB.");
}

// --- ROUTES ---

app.get("/", (req, res) => {
  const currentType = req.query.type || "All";
  const currentSearch = req.query.search || "";
  res.render("home", { currentType, currentSearch, vehicles: [] });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  console.log("Login attempt received:", req.body);
  res.status(200).json({ success: true, message: "Login successful" });
});

// NEW ROUTES: Buy and Sell Pages
app.get("/buy", (req, res) => {
  res.render("buy");
});

app.get("/sell", (req, res) => {
  res.render("sell");
});

// --- SERVER START ---

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});