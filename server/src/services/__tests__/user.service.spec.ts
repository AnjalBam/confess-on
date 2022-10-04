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
            // const spyOnFindById = jest
            //     .spyOn(userModel, 'findById')
            //     .mockImplementationOnce(
            //         () =>
            //             ({
            //                 select: jest.fn().mockReturnValue(retValue),
            //             } as unknown as Query<
            //                 unknown,
            //                 unknown,
            //                 object,
            //                 UserDocument
            //             >)
            //     );

            const spyOnFindById = jest
                .spyOn(userModel, 'findById')
                .mockReturnValue(
                    retValue as unknown as Query<
                        unknown,
                        unknown,
                        object,
                        UserDocument
                    >
                );
            const spyOnSelect = jest
                .spyOn(userModel.prototype, 'select')
                .mockReturnValue(
                    retValue as unknown
                );
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
            const spyOnFindById = jest
                .spyOn(userModel, 'findById')
                .mockRejectedValue(new Error('Error occurred'));

            try {
                const user = await getUserById(userId);
                expect(user).toBeUndefined();
                expect(spyOnFindById).toThrow();
            } catch (err: unknown) {
                expect(err).toBeDefined();
            }
        });
    });
});
