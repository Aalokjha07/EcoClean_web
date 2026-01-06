const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        subject: {
            type: String,
            required: [true, "Please enter the issue subject"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        address: {
            type: String,
            required: [true, "Location address is required"],
        },
        imageBefore: {
            type: String,
            required: false,
            default: "https://via.placeholder.com/150"
        },
        userId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "pending", // Will be changed to "Assigned" or "Fixed" later
        },
        // --- NEW ASSIGNMENT FIELDS ADDED HERE ---
        assignedStaff: { 
            type: String, 
            default: null 
        },
        department: { 
            type: String, 
            default: null 
        },
        assignedAt: { 
            type: Date, 
            default: null 
        }
    },
    {
        timestamps: true, 
    }
);

// We keep the model name "Report" so your controller (Report.findById) works.
// We keep the Schema name "ProductSchema" so your existing logic doesn't break.
const Report = mongoose.model("Report", ProductSchema);

module.exports = Report;