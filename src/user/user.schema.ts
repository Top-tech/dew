import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: Schema.Types.String,
    // TODO: Create a custom Email type.
    email: Schema.Types.String,
    // TODO: Create a custom Phone type.
    phone: Schema.Types.String,
    salt: String,
    password: String,
    created: Schema.Types.Date,
    updated: Schema.Types.Date,
    lastLogin: Schema.Types.Date,
    deprecated: { type: Schema.Types.Boolean, default: false }
});
