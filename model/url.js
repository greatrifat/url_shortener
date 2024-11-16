import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    urlId: { type: String, required: true },
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, unique: true },
    accessCount: { type: Number, default: 0 },
}, {timestamps: true});

const URL = mongoose.models.users || mongoose.model("users", urlSchema);

export default URL;