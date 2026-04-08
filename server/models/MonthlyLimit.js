import mongoose from "mongoose";

const monthlyLimitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    category:{
        type : String,
        required:true,
        enum: ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Other"]
    },
    limit:{
        type:Number,
        required:true,
        min: 0
    },
    spent:{
        type:Number,
        default:0,
        min: 0
    },
    month:{
        type: Date,
        required: true
    }
}, { timestamps: true });

monthlyLimitSchema.index({ userId: 1, category: 1, month: 1 }, { unique: true });

monthlyLimitSchema.pre("validate", function () {
    if (!this.month) {
        const now = new Date();
        this.month = new Date(now.getFullYear(), now.getMonth(), 1);
    }
});

monthlyLimitSchema.virtual("remaining").get(function () {
    return this.limit - this.spent;
})

const MonthlyLimit = mongoose.models.monthlyLimit || mongoose.model('monthlyLimit', monthlyLimitSchema);
export default MonthlyLimit;