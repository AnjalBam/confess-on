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