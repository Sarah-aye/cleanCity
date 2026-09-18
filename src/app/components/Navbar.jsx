"use client";

import Link from "next/link";
import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;
  return (
    <BsNavbar expand="lg" sticky="top" className="site-nav bg-body-tertiary">
      <Container>
        <BsNavbar.Brand as={Link} href="/" className="fw-bold brand-mark ">
          <span className="brand-dot ">+</span>
          <span className="brand-color">CleanCity</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle
          aria-controls="main-nav"
          aria-label="Toggle navigation"
        />
        <BsNavbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link
              as={Link}
              href="/"
              active={isActive("/")}
              className={isActive("/") ? "fw-bold text-tertiary" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/waste-categories"
              active={isActive("/waste-categories")}
              className={
                isActive("/waste-categories") ? "fw-bold text-tertiary" : ""
              }
            >
              Waste Categories
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/recycling-tracker"
              active={isActive("/recycling-tracker")}
              className={
                isActive("/recycling-tracker") ? "fw-bold text-tertiary" : ""
              }
            >
              Tracker
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/pledge"
              active={isActive("/pledge")}
              className={isActive("/pledge") ? "fw-bold text-tertiary" : ""}
            >
              Pledge
            </Nav.Link>
            <Nav.Item className="ms-lg-2 mt-2 mt-lg-0">
              <ThemeToggle />
            </Nav.Item>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
