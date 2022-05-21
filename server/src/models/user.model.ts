import { Schema, model, Document } from 'mongoose';
import crypto from 'crypto';

export interface UserDocument extends Document {
    fullName: string;
    email: string;
    password: string;
    username: string;
    salt: string;
    userType: string;
    createdAt: Date;
    updatedAt: Date;
    bio?: string;
    setPassword(password: string): void;
    validatePassword(password: string): boolean;
}

const UserSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value: string) => {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        value
                    );
                },
                message: '{VALUE} is not a valid email address!',
            },
        },
        salt: String,
        password: {
            type: String,
            required: true,
            min: [8, 'Minimum length should be of 8 characters.'],
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        userType: {
            type: String,
            required: true,
            default: 'user',
            enum: ['user', 'admin'],
        },
        bio: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    if (!this.salt) {
        throw new Error('Please save password with setPassword method');
    }

    next();
});

const keyLength = 512;
const iterations = 10000;
const digest = 'sha512';
const encoding = 'hex';

UserSchema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto
        .pbkdf2Sync(password, this.salt, iterations, keyLength, digest)
        .toString(encoding);
};

UserSchema.methods.validatePassword = function (password: string) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, iterations, keyLength, digest)
        .toString(encoding);

    return this.password === hash;
};

export default model<UserDocument>('User', UserSchema);
