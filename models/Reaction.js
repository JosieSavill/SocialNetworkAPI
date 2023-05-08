const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionsSchema = new Schema(

    {

        reactionBody: {

            type: String,
            required: true,
            maxlength: 280,

        },

        username: {

            type: String,
            required: true,

        },

        createdAt: {

            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),

        },

    },

    {

        toJSON: {
            getters: true,
            virtuals: true,
            versionKey: false,
            transform: function (doc, ret) {

                delete ret._id;
            },

        },

        id: false,

    }

);

const Reaction = model('Reaction', ReactionsSchema);

module.exports = Reaction;