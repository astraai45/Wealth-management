import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function NavbarComponent() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  return (
    <Navbar
      expand="lg"
      className={`glass-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <span className="brand-gradient">WealthGuard Pro</span>
          <div className="brand-underline"></div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler-custom"
        >
          <div className="animated-hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {["/", "/maps", "/chat", "/predict"].map((path) => {
              let name = path.slice(1) || "home";
              return (
                <Nav.Link
                  key={path}
                  as={Link}
                  to={path}
                  className={`nav-link-custom text-center ${
                    activeLink === path ? "active" : ""
                  }`}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  <div className="link-underline"></div>
                  <div className="link-hover-effect"></div>
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="navbar-light-reflection"></div>
    </Navbar>
  );
}

export default NavbarComponent;
