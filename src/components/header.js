import React from 'react';
import { Nav, Navbar,NavLink } from 'react-bootstrap';

export default function Header(props) {
    const showLogOutModal = () => {
        props.showLogOut(true);
    }
    return (
        <Navbar className="header" expand="lg" style={{ marginTop: '50px', marginBottom: '50px', margin: '30px', display: 'flex', justifyContent: 'space-between' }}>
            <Nav className="ml-auto">
                <Nav.Item style={{ marginRight: '40px' }} href="#home">
                    <Nav.Link href="/homepage">
                        <span style={{color: 'black'}}>S</span>
                        <span style={{color: 'orange'}}>EAT</span>
                        <span style={{color: 'black'}}>TLE</span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            {!props.loading &&<Nav className="ml-auto">
                <Nav.Item style={{ marginRight: '40px' }}>
                    <Nav.Link to="/quiz" href="/quiz">
                        <span style={{color: 'black'}}>QUIZ</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item style={{ marginRight: '40px' }}>
                    <Nav.Link href="/compare">
                        <span style={{color: 'black'}}>COMPARE</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item style={{ marginRight: '40px' }}>
                    <Nav.Link href="/community">
                        <span style={{color: 'black'}}>COMMUNITY</span>
                    </Nav.Link>
                </Nav.Item>
                {!props.user && <NavLink href="/signin" ><span style={{color: 'black'}}>SIGN-IN</span></NavLink>}
                    {props.user &&
                        <Nav className="me-auto">
                            <NavLink onClick={showLogOutModal} className="d-inline" ><span style={{color: 'black'}}>Log out</span></NavLink>
                        </Nav>
                    }
                </Nav>
                
            }
            </Navbar.Collapse>
        </Navbar>
    )
}
