import React from "react";
import {Navbar, Nav, NavDropdown, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// navbar
function Navigation() {
    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }
    
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    {/* redirect pagina principala */}
                    <Navbar.Brand href="" onClick={(e) => navigateTo(e, "/")}>Virtual library</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;