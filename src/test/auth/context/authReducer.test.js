import { authReducer, types } from "../../../auth";

describe('testing authReducer.js', () => {

    const initialState = { logged: false }
    
    test('should get back the state by default', () => {

        const newState = authReducer( initialState, {} );
        expect(newState).toBe( initialState );

    });

    test('should (login) authenticate and set the user', () => {

        const user = { id: 'ABC', name: 'Nico' }

        const action = {
            type: types.login,
            payload: user
        }

        const newState = authReducer( initialState, action );
        expect(newState.logged).toBeTruthy();
        expect(newState.user).toBe( user );
    });

    test('should (logout) delete the name of the user, and turn logged in false', () => {

        const user = { id: 'ABC', name: 'Nico' }

        const action1 = {
            type: types.login,
            payload: user
        }

        const action2 = {
            type: types.logout,
        }

        const newState1 = authReducer( initialState, action1 );
        const newState2 = authReducer( newState1, action2 );
        expect(newState2.logged).toBeFalsy();
        expect(newState2.user).toBe( undefined );
        expect(newState2).not.toContain( user );
    });

});