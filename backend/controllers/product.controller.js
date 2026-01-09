const fs = require('fs');
const path = require('path');
const Report = require("../models/product.model");
const Fix = require("../models/fix.model"); // Import the new model

// Helper function to handle Base64 to Local File conversion
const saveBase64Image = (base64Str, prefix) => {
    if (!base64Str || !base64Str.includes('base64,')) return base64Str;

    try {
        const base64Data = base64Str.split(';base64,').pop();
        const fileName = `${prefix}_${Date.now()}.png`;
        const filePath = path.join(__dirname, '../uploads', fileName);

        fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });
        
        // UNIVERSAL FIX: Save the folder path so the frontend knows where it is
        return `/uploads/${fileName}`; 
    } catch (error) {
        console.error("File save error:", error);
        return null;
    }
};
// 1. Get All Reports
const getReports = async (req, res) => {
    try {
        const reports = await Report.find({});
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Get Single Report Detail
const getReport = async (req, res) => {
    try {
        const { id } = req.params;
        if (id.length !== 24) return res.status(400).json({ message: "Invalid ID" });

        const report = await Report.findById(id);
        if (!report) return res.status(404).json({ message: "Report not found" });

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Add New Report (Updated with File logic)
const addReport = async (req, res) => {
    try {
        // Convert the user's uploaded image to a local file
        const fileName = saveBase64Image(req.body.imageBefore, 'user_report');

        const reportData = {
            ...req.body,
            imageBefore: fileName || "https://via.placeholder.com/150",
            status: "pending"
        };

        const report = await Report.create(reportData);
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Assign Staff to Report
const assignStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { assignedStaff, department } = req.body;

        const updatedReport = await Report.findByIdAndUpdate(
            id,
            { assignedStaff, department, status: "Assigned", assignedAt: new Date() },
            { new: true }
        );

        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. NEW: Submit Fix (Uses Fix Model)
const submitFix = async (req, res) => {
    try {
        const { report_id, subject, location, notes, imageBefore, imageAfter } = req.body;

        // 1. SAVE THE FIX RECORD
        const newFix = await Fix.create({
            report_id,
            subject,
            location,
            notes,
            imageBefore: saveBase64Image(imageBefore, 'before'),
            imageAfter: saveBase64Image(imageAfter, 'after'),
            status: "Resolved" // Match your "Processed" column filter
        });

        // 2. UPDATE THE ORIGINAL REPORT 
        const updatedReport = await Report.findByIdAndUpdate(
            report_id, 
            { status: "Resolved" }, // Changed from "Fixed" to "Resolved"
            { new: true }
        );

        if (!updatedReport) {
            return res.status(404).json({ message: "Original report not found." });
        }

        res.status(200).json({ success: true, updatedReport });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 6. Delete Report
const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        await Report.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        
        // We use req.body to catch all the staff fields 
        // (staffId, staffNotes, staffLocation, imageAfter)
        const updatedReport = await Report.findByIdAndUpdate(
            id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        );

        if (!updatedReport) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// In your Fix Controller
 const getFixByReportId = async (req, res) => {
  try {
    // We search the Fix collection for a document where report_id matches the ID from params
    const fix = await Fix.findOne({ report_id: req.params.id });
    if (!fix) return res.status(404).json({ message: "No fix found for this report" });
    res.status(200).json(fix);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
    getReports,
    getReport,
    addReport,
    deleteReport,
    assignStaff,
    submitFix ,// Export the new function,
    updateReport,
    getFixByReportId
};