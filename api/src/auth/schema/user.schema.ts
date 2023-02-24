import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Document } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    role: string;
    readonly password: string;
    createdAt: Date;
}

export const userSchema = new mongoose.Schema({
    // user schema
    name: String,
    email: String,
    role: {
        type: String,
        default: 'CUSTOMER'
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// Pre-save hook to hash the password
userSchema.pre('save', async function (next: any) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});
