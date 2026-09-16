import Link from "next/link";
import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap";

export default function Navbar() {
  return (
    <BsNavbar expand="lg" sticky="top" className="site-nav">
      <Container>
        <BsNavbar.Brand as={Link} href="/" className="fw-bold brand-mark">
          <span className="brand-dot">+</span> CleanCity
        </BsNavbar.Brand>
        <BsNavbar.Toggle
          aria-controls="main-nav"
          aria-label="Toggle navigation"
        />
        <BsNavbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/waste-categories">
              Waste Categories
            </Nav.Link>
            <Nav.Link as={Link} href="/recycling-tracker">
              Tracker
            </Nav.Link>
            <Nav.Link as={Link} href="/pledge">
              Pledge
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
