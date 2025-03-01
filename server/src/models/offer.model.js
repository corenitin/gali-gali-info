import { Schema, model } from "mongoose";

const offerSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }, 
    type: {
        type: String,
        required: true,
        enum: ["percentage", "fixed", "conditional", "buy"]
    },
    details: {
        discount: { type: Number },  // For "percentage" and "fixed"
        minPurchase: { type: Number },  // For "conditional"
        buyQty: { type: Number },  // For "buy"
        getQty: { type: Number }  // For "buy"
    },
    expiryDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

/**
 * Pre-save hook to validate the `details` field based on `type`
 */
offerSchema.pre("save", function (next) {
    if (!this.details) {
        return next(new Error("Offer details are required."));
    }

    switch (this.type) {
        case "percentage":
            if (typeof this.details.discount !== "number" || this.details.discount <= 0 || this.details.discount > 100) {
                return next(new Error("Percentage offer must have a discount value between 1 and 100."));
            }
            break;

        case "fixed":
            if (typeof this.details.discount !== "number" || this.details.discount <= 0) {
                return next(new Error("Fixed offer must have a valid discount amount."));
            }
            break;

        case "conditional":
            if (typeof this.details.minPurchase !== "number" || typeof this.details.discount !== "number") {
                return next(new Error("Conditional offer must include `minPurchase` and `discount`."));
            }
            break;

        case "buy":
            if (typeof this.details.buyQty !== "number" || typeof this.details.getQty !== "number") {
                return next(new Error("Buy offer must include `buyQty` and `getQty`."));
            }
            break;

        default:
            return next(new Error("Invalid offer type."));
    }
    next();
});

offerSchema.virtual("isExpired").get(function () {
    return new Date() > this.expiryDate;  // Compare current date with expiryDate
});

/**
 * Virtual field: `remainingDays`
 * Returns the number of days left before the offer expires.
 * If the offer is expired, it returns 0.
 */
offerSchema.virtual("remainingDays").get(function () {
    const today = new Date();
    const expiry = new Date(this.expiryDate);
    
    const timeDiff = expiry - today;  // Difference in milliseconds
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
    
    return daysLeft > 0 ? daysLeft : 0;  // Return 0 if already expired
});

export const Offer = model("Offer", offerSchema);
