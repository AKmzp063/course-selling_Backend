import mongoose from "mongoose";

const schema = new mongoose.Schema({

    //Title type, required, minlength, maxlength
    title: {
        type: String,
        required: [true,"Enter a course title"],
        minlength: [4,"title must be at least 4 characters"],
        maxlength: [80,"title can't be exceed 80 characters"],
    },
    //Description type, required, minlength
    description: {
        type: String,
        required: [true,"Enter a course description"],
        minlength: [20,"description must be at least 20 characters"],
    },
    //Lecture title, description, videos {public_id, url}
    lectures: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            video: {
                public_id: {
                    type: String,
                    required: [true],
                },
                url: {
                    type: String,
                    required: [true],
                },
            },
        }
    ],
    //Poster public_id, url
    poster: {
        public_id: {
            type: String,
            required: [true],
        },
        url: {
            type: String,
            required: [true],
        },
    },
    //Views type, default
    views: {
        type: Number,
        default: 0,
    },
    //NumOfVideos type, default
    numOfVideos: {
        type: Number,
        default: 0,
    },
    //Category type, required
    category: {
        type: String,
        required: true,
    },
    //CreatedBy type, required
    createdBy: {
        type: String,
        required: [true,"Enter course Creator Name"],
    },
    //CreatedAt type, default
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Course = mongoose.model("Course", schema);