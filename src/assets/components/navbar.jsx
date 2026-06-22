import React, { useState } from 'react'
import logoImg from "../logo/logo dev.png"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const fecharMenu = () => setMenuOpen(false)

  return (
    <>
      <header>
        <nav>
          <a href="#home" className="logo">
            <span className="logo-mark">
              <img src={logoImg} alt="Thyago Dev logo" />
            </span>
          </a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#sobre">Sobre mim</a></li>
            <li><a href="#stack">Stack</a></li>
            <li><a href="#projetos">Projetos</a></li>
            <li><a href="#contato">Contatos</a></li>
          </ul>
          <a href="#contato" className="nav-cta">contato</a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>

      <div
        className={`drawer-overlay${menuOpen ? ' open' : ''}`}
        onClick={fecharMenu}
      ></div>
      <div className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
        <a href="#home" onClick={fecharMenu}>Home</a>
        <a href="#sobre" onClick={fecharMenu}>Sobre mim</a>
        <a href="#stack" onClick={fecharMenu}>Stack</a>
        <a href="#projetos" onClick={fecharMenu}>Projetos</a>
        <a href="#contato" onClick={fecharMenu}>Contatos</a>
      </div>
    </>
  )
}

export default Navbar;
