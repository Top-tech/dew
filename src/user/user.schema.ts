import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: Schema.Types.String,
    email: Schema.Types.String,
    phone: Schema.Types.String,
    salt: String,
    password: String,
    created: Schema.Types.Date,
    updated: Schema.Types.Date,
    lastLogin: Schema.Types.Date,
    deprecated: { type: Schema.Types.Boolean, default: false },
    ip: Schema.Types.String
});
