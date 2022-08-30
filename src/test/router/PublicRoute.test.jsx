import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../auth";
import { PublicRoute } from "../../router/PublicRoute";

describe('testing <PublicRoute />', () => {

    test('should show the children if there is not authenticated', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Public Route</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Public Route') ).toBeTruthy();

    });

    test('should navigate if there is authenticated', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Nicoh'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Public Route</h1>
                            </PublicRoute>
                        }/>
                        <Route path="marvel" element={ <h1>Marvel Page</h1> } />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Marvel Page') ).toBeTruthy();

    });

});