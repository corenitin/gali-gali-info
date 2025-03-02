import { Schema, model } from "mongoose";

const productSchema = new Schema({
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
    details: [
        {
            title: String,
            desc: String,
        }
    ],
    offers: [{
        type: Schema.Types.ObjectId,
        ref: "Offer"
    }],
    overallRating: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, {timestamps: true});

export const Product = model('Product', productSchema);