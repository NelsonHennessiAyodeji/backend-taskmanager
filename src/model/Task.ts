import mongoose from "mongoose";

const TaskModelSchema = new mongoose.Schema({
    // No need to explicitely define ID since mongo generates that automatically
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "title cannot be less than 3 characters"],
        maxlength: [40, "title cannot be more than 40 characters"],
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    dueDate: {
        type: String,
        required: true,
    }
}, {timestamps: true}); // For the update and created at time stamps

export default mongoose.model("Task", TaskModelSchema);
