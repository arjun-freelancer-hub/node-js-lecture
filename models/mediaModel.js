import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    title: {
        type: String,
        required : [true, 'Title required']
    },
    description:{
        type: String,
        required : [true, 'Description required'],
        min : [3, 'Minimum 3 characters required in description']
    },
    src: {
        type: String, 
        required: true
    },

    category: [
        'Education'
    ],
    mimeType: String,
    published: Boolean,
})