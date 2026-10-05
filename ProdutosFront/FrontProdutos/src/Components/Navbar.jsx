import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" end className={({ isActive }) => isActive ? "link-ativo" : "" }> Home </NavLink>

            <NavLink to="/produtos" end className={({ isActive }) => isActive ? "link-ativo" : "" }> Produtos </NavLink>
        </nav>
    );
}

export default Navbar;