const mongoose = require("mongoose");

BandSchema = new mongoose.Schema(
    {
        bandName : {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [3, "{PATH} must be at least {MINLENGTH} characters."],
        },

        description : {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [3, "{PATH} must be at least {MINLENGTH} characters."],
        },

        genres : {
            type: Array
        }
    },
        { timestamps: true }
);

const Band = mongoose.model("band", BandSchema);
module.exports = Band;