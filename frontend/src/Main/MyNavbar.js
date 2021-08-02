import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import './MyNavbar.css'

function MyNavbar() {

    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="light" id='MyNavbar' fixed="top">
            <Container>
                <Navbar.Brand>
                    <Link className="NavLink" to='/'>
                        PMD Planner
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
                        <a className="NavLink" href="mailto:slippyg0@protonmail.com">
                            Contact
                        </a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar