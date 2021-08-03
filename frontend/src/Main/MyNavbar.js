import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import './MyNavbar.css'

function MyNavbar() {

    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="light" id='MyNavbar' fixed="top">
            <Container>
                <Navbar.Brand>
                    <Link className="NavLink" to='/'>
                        <img
                            src="/images/other/logo.png"
                            height="30"
                            className="d-inline-block align-top"
                            alt="PMD Planner logo"
                            style={{
                                margin: "0px 0px 0px",
                                padding: "0px"
                            }}
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav>
                        <Link className="NavLink" to='/about'>
                            About
                        </Link>
                        <Link className="NavLink" to='faq'>
                            FAQ
                        </Link>
                        <a className="NavLink" href="mailto:PMDPlanner@protonmail.com">
                            Contact
                        </a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar