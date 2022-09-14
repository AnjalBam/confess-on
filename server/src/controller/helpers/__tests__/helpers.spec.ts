import { checkPasswords } from "..";

describe("Testing helpers", () => {
    describe("Test password comparing helper", () => {
        it("should return true if passwords are equal", () => {
            expect(checkPasswords("password", "password")).toBe(true);
        });

        it("should return false if passwords are not equal", () => {
            expect(checkPasswords("password", "notEqual")).toBe(false);
        });
    })
})