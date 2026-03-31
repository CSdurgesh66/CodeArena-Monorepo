const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title cannot be empty'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description cannot be empty'],
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: [true, 'Difficulty cannot be empty'],
        default: 'easy'
    },
    testCases: [
        {
            _id: false,
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            },

        }
    ],

    codeStubs: [
        {
            _id: false,
            language: {
                type: String,
                required: true
            },
            startSnippet: {
                type: String,
                // required: true
            },
            endSnippet: {
                type: String,
                // required: true
            }
        }
    ],

    editorial: {
        type: String
    }

}, { timestamps: true })



module.exports = mongoose.model('Problem', problemSchema);