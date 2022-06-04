import { UserDocument } from "../../models/user.model";

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
    confirmPassword: validUserData.password
}

export const changePasswordData = {
    password: 'oldPassword',
    newPassword: 'newPassword',
    confirmNewPassword: 'newPassword'
}

export const userData= {
    _id: '5e9f8f8f8f8f8f8f8f8f8f8',
    fullName: 'Test User',
    email: 'test@email.com',
    password: 'password123',
    username: 'testuser',
    userType: 'user',
    bio: "Test User's bio",
    createdAt: new Date(),
    updatedAt: new Date(),
}