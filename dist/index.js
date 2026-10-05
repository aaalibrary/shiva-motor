// src/index.ts
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
console.log("SHIVA MOTORS SERVER BOOTING...");
var mongoURI = process.env.MONGO_URI || "";
mongoose.connect(mongoURI).then(() => console.log("MongoDB successfully connected!")).catch((err) => console.error("CRASH [MongoDB Connection Error]:", err));
app.get("/", (req, res) => {
  const currentType = req.query.type || "Car";
  res.render("home", { currentType, vehicles: [] });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  console.log("Login attempt received:", req.body);
  res.status(200).json({ success: true, message: "Login successful" });
});
var PORT = process.env.PORT || 3e3;
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
