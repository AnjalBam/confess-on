import { Query, Types } from 'mongoose';
import userModel, { UserDocument } from '../../models/user.model';
import { getValidUserDoc } from '../../test/fixtures';
import { getUserById } from '../user.service';

describe('USER SERVICES TEST', () => {
    describe('TEST getUserByID', () => {
        it('should return userDocument', async () => {
            const userId = new Types.ObjectId();
            const retValue = {
                ...getValidUserDoc(),
                _id: userId,
            };

            const spyOnFindById = jest
                .spyOn(userModel, 'findById')
                .mockImplementationOnce(() => {
                    return {
                        select: jest.fn().mockReturnValue(retValue),
                    } as unknown as Query<
                        unknown,
                        unknown,
                        object,
                        UserDocument
                    >;
                });
            try {
                const user = await getUserById(userId);
                expect(spyOnFindById).toHaveBeenCalledWith(userId);
                expect(user).toEqual({
                    ...getValidUserDoc(),
                    _id: userId,
                });
            } catch (err: unknown) {
                expect(err).toBe(undefined);
            }
        });

        it('should throw error if any occur', async () => {
            const userId = new Types.ObjectId();

            try {
                const spyOnFindById = jest
                    .spyOn(userModel, 'findById')
                    .mockImplementationOnce(() => {
                        return {
                            select: jest
                                .fn()
                                .mockRejectedValue(new Error('Error')),
                        } as unknown as Query<
                            unknown,
                            unknown,
                            object,
                            UserDocument
                        >;
                    });
                const user = await getUserById(userId);
                expect(user).toBeUndefined();
                expect(spyOnFindById).toThrow();
            } catch (err: unknown) {
                expect(err).toBeDefined();
            }
        });
    });
});
