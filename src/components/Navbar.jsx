import { Link } from 'react-router-dom';
import '../App.css'

function Navbar() {

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Radionice</Link></li>
                <li><Link to="/predavaci">Predavaci</Link></li>
                <li><Link to="/administracija">Administracija</Link></li>
            </ul>
            <div className="admin-section">
                <label htmlFor="toggle">Admin</label>
                <button id="toggle" className="toggle-button"></button>
            </div>
        </nav>
    )
  }
  
  export default Navbar