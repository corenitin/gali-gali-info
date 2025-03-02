import { Schema, model } from "mongoose";

const productSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    desc: String,
    images: [
        {
            type: String,
            required: true
        }
    ],
    price: {
        type: Number,
        required: true,
    }, 
    quantity: {
        type: Number,
        required: true,
    },
    qtyUnit: {
        type: String,
        required: true
    },
    offers: [{ type: String }],
    // offers: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Offer"
    // }],
    overallRating: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, {timestamps: true});

export const Product = model('Product', productSchema);