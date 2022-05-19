import { Schema, model } from 'mongoose';
import crypto from 'crypto';

const UserSchema = new Schema({
    full_name: {
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
        min: [8, 'Minimum length should be of 8 characters.']
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

export default model('User', UserSchema);
