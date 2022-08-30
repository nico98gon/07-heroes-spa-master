import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth";
import { PrivateRoute } from "../../router/PrivateRoute";

describe('testing <PrivateRoute />', () => {

    test('should show the children if there is authenticated', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Nicoh'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={[ '/search?q=Batman' ]}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta Privada') ).toBeTruthy();

        expect( localStorage.setItem ).toHaveBeenCalledWith( "lastPath", "/search?q=Batman" );

    });

});