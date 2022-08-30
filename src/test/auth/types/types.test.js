import { types } from "../../../auth";

describe('testing types.js', () => {
    test('should block the types', () => {
        expect(types).toEqual({ 
            login: '[Auth] Login',
            logout: '[Auth] Logout' })
    });
});