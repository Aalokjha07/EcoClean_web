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
        // Citizen's original photo
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
            default: "pending", 
        },
        // --- ASSIGNMENT FIELDS ---
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
        },

        // --- NEW RESOLUTION FIELDS (Staff Update) ---
        // These will be filled when StaffReportFix.jsx is submitted
        staffId: { 
            type: String, 
            default: null 
        },
        staffNotes: { 
            type: String, 
            default: "" 
        },
        staffLocation: { 
            type: String, 
            default: "" 
        },
        imageAfter: { 
            type: String, 
            default: null 
        },
        imageBefore2: { 
            type: String, 
            default: null 
        },
        resolvedAt: { 
            type: Date, 
            default: null 
        }
    },
    {
        timestamps: true, 
    }
);

const Report = mongoose.model("Report", ProductSchema);

module.exports = Report;