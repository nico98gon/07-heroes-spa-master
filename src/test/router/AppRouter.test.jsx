import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth";
import { AppRouter } from "../../router/AppRouter";

describe('testing en <AppRouter />', () => {

    test('should show the login if there is not authenticated', () => {

        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // expect( screen.getAllByText('Login').length ).toBe(2);
        expect( screen.getByText('Login') ).toBeTruthy();
        expect( screen.getByText('LoginPage') ).toBeTruthy();

    });

    test('should show marvel component if there is authenticated', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC', 
                name: 'Nicoh'
            }
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();

        expect( screen.getAllByText('More Info...').length ).toBeGreaterThanOrEqual(1);
        expect( document.getElementsByTagName("img") ).toBeTruthy();
        expect( document.getElementsByTagName("small") ).toBeTruthy();
        expect( document.getElementsByTagName("p") ).toBeTruthy();

    });

})