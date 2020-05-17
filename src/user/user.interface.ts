import { Document } from 'mongoose';

export interface User extends Document {
    readonly name?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly password: string;
    readonly created: Date,
    readonly updated: Date,
    readonly salt: Buffer;
    readonly deprecated: boolean;
}
