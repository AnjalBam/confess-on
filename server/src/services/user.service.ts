import mongoose, { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(
    input: DocumentDefinition<
        Omit<
            UserDocument,
            | 'createdAt'
            | 'updatedAt'
            | 'comparePassword'
            | 'validatePassword'
            | 'salt'
        >
    >
) {
    try {
        const user = await UserModel.create(input);
        return user;
    } catch (err: unknown) {
        throw new Error(err as string);
    }
}

export async function getUserById(id: string | mongoose.Types.ObjectId) {
    try {
        return await UserModel.findById(id).select('-salt -password');
    } catch (err: unknown) {
        throw new Error(err as string);
    }
}
