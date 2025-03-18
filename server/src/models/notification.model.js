import { model, Schema } from 'mongoose';

const notificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reciever: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    
}, { timestamps: true });

export const Notification = model('Notification', notificationSchema);