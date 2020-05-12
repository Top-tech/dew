import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: Schema.Types.String,
    // TODO: Create a custom Email type.
    email: Schema.Types.String,
    // TODO: Create a custom Phone type.
    phone: Schema.Types.String,
    password: String,
    created: Schema.Types.Date,
    updated: Schema.Types.Date,
    lastLogin: { type: Schema.Types.Date, default: Date.now() },
    deprecated: { type: Schema.Types.Boolean, default: false }
});
