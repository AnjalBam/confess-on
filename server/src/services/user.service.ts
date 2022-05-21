import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(
    input: DocumentDefinition<
        Omit<
            UserDocument,
            'createdAt' | 'updatedAt' | 'comparePassword' | 'validatePassword'
        >
    >
) {
    try {
        const user = await UserModel.create(input);
        user.save();
        return user;
    } catch (err: unknown) {
        throw new Error(err as string);
    }
}
