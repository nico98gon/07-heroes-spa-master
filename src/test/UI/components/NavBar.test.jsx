import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth";
import { Navbar } from "../../../UI/components/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Testing <NavBar />', () => {

    const user = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Nicoh'
        },
        logout: jest.fn()
    }

    beforeEach( () => jest.clearAllMocks() );

    test('should show the name of the user', () => {
    
    render(
        <MemoryRouter>
            <AuthContext.Provider value={ user }>
                <Navbar />
            </AuthContext.Provider> 
        </MemoryRouter>
    );

    expect( screen.getByText('Nicoh') ).toBeTruthy();

    });
    
    test('should call the logout and navigate when click the button', () => {

        render(
            <MemoryRouter>
                <AuthContext.Provider value={ user } >
                    <Navbar />
                </AuthContext.Provider> 
            </MemoryRouter>
        );

        const setButton = screen.getByRole( 'button' );
        fireEvent.click( setButton );
        screen.debug()
        expect( user.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});

    });

});