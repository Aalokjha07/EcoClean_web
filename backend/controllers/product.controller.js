// Keep ONLY ONE of these. Choose the one that points to your actual Mongoose Schema.
// If your file is named report.model.js, use the second one.
const Report = require("../models/product.model"); 

// 1. Get All Reports
const getReports = async (req, res) => {
    try {
        const reports = await Report.find({});
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Get Single Report Detail (for ReportDetail page)
const getReport = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Prevents server crash if the ID isn't exactly 24 characters
        if (id.length !== 24) {
            return res.status(400).json({ message: "Invalid Report ID format" });
        }

        const report = await Report.findById(id);

        if (!report) {
            return res.status(404).json({ message: "Report not found in database" });
        }

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Add New Report
const addReport = async (req, res) => {
    try {
        const reportData = {
            subject: req.body.subject,        
            description: req.body.description, 
            address: req.body.address,         
            imageBefore: req.body.imageBefore, 
            userId: req.body.userId,           
            status: "pending"                  
        };

        const report = await Report.create(reportData);
        res.status(201).json(report); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Delete Report
const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findByIdAndDelete(id);

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. Assign Staff to Report
const assignStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { assignedStaff, department } = req.body;

        const updatedReport = await Report.findByIdAndUpdate(
            id,
            { 
                assignedStaff, 
                department, 
                status: "Assigned" 
            },
            { new: true }
        );

        if (!updatedReport) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getReports,
    getReport,
    addReport,
    deleteReport,
    assignStaff
};