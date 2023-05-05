const { Schema } = require('mongoose');
const moment = require('moment');

const ReactionsSchema = new Schema(

    {

        reactionBody: {

            type: String,
            requried: true,
            maxlength: 280,

        },

        username: {

            trype: String,
            required: true,


        },

        createdAt: {

            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),

        },

    }

);



module.exports = ReactionSchema;