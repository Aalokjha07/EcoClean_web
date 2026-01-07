const mongoose = require('mongoose');

const FixSchema = mongoose.Schema(
    {
        report_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report',
            required: true
        },
        staffId: { type: String, default: "staff_001" },
        location: { type: String, required: true },
        imageBefore: { type: String, required: true }, 
        imageAfter: { type: String, required: true },  
        notes: { type: String, required: true },
        status: { type: String, default: "Resolved" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Fix", FixSchema);