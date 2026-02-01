const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const ReportRoute = require("./routes/product.route.js");
const Fix = require("./models/fix.model.js"); // Import your new Fix model

const app = express();

// 1. GLOBAL SETTINGS & LIMITS (Must be at the very top)
app.use(cors());
// Combine into one line with the 50mb limit
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

// 2. STATIC FILES
// Serve the uploads folder so frontend can see saved images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 3. INTEGRATED FIX SUBMISSION ROUTE
// This replaces the generic logic and uses your new Fix model
app.post("/api/Report/fixes/submit", async (req, res) => {
  try {
    const { report_id, location, notes, imageBefore, imageAfter } = req.body;

    // Helper to save Base64 to Local Folder
    const saveImage = (base64String, prefix) => {
      if (!base64String || !base64String.includes("base64,")) return null;
      const base64Data = base64String.split(";base64,").pop();
      const fileName = `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}.png`;
      const filePath = path.join(__dirname, "uploads", fileName);

      fs.writeFileSync(filePath, base64Data, { encoding: "base64" });
      return fileName;
    };

    // Save files and get filenames
    const beforeFile = saveImage(imageBefore, "before");
    const afterFile = saveImage(imageAfter, "after");

    // Save to NEW Fix Model in MongoDB
    const newFix = new Fix({
      report_id,
      location,
      notes,
      imageBefore: beforeFile,
      imageAfter: afterFile,
      status: "Resolved",
    });
    await newFix.save();

    // Update original Report status to Resolved
    // Ensure your Report model is registered or imported
    await mongoose
      .model("Report")
      .findByIdAndUpdate(report_id, { status: "Resolved" });

    res
      .status(200)
      .json({ success: true, message: "Images saved and Fix record created!" });
  } catch (error) {
    console.error("Upload Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// 4. GENERAL ROUTES
app.use("/api/Reports", ReportRoute);
app.use("/api/Report", ReportRoute);

app.get("/", (req, res) => {
  res.send("EcoClean Node API is running!");
});

// 5. DATABASE & SERVER START
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database..!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection failed...!", err);
  });
