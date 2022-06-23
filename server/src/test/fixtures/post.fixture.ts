import mongoose from "mongoose"

export const validPostInput = {
    description: 'Test Post',
    visibility: 'public',
    user: new mongoose.Types.ObjectId(),
}

export const validPostData = {
    ...validPostInput,
    _id: new mongoose.Types.ObjectId(),
    createdAt: new Date().toString(),
    modifiedAt: new Date().toString(),
}

export const generatePostData = () => ({
    ...validPostData,
    likes: [''],
})

export const generatePostDataArray = (count = 10): unknown[] => {
    const result: unknown[] = [];
    for (let i = 0; i < count; i++) {
        result.push(generatePostData());
    }
    return result;
}