import mongoose from 'mongoose';

export const validUserData = {
    fullName: 'Test User',
    email: 'test@email.com',
    password: 'password123',
    username: 'testuser',
    userType: 'user',
    bio: "Test User's bio",
};

export const signUpData = {
    ...validUserData,
    confirmPassword: validUserData.password,
};

export const changePasswordData = {
    password: 'oldPassword',
    newPassword: 'newPassword',
    confirmNewPassword: 'newPassword',
};

export const userData = {
    _id: new mongoose.Types.ObjectId(),
    fullName: 'Test User',
    email: 'test@email.com',
    password: 'password123',
    username: 'testuser',
    userType: 'user',
    bio: "Test User's bio",
    createdAt: new Date(),
    updatedAt: new Date(),
};
