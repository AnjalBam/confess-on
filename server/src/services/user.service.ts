import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(
    input: DocumentDefinition<
        Omit<
            UserDocument,
            'createdAt' | 'updatedAt' | 'comparePassword' | 'validatePassword' | 'salt'
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
