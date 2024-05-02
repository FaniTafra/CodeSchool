import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import '../App.css'
import { useState } from 'react';

function Navbar() {

    const [isAdmin, setIsAdmin] = useState(false);

    const handleToggleChange = () => {
        const newValue = !isAdmin;
        setIsAdmin(newValue);
        onToggleSwitchChange(newValue);
    };

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Radionice</Link></li>
                <li><Link to="/predavaci">Predavaci</Link></li>
                {isAdmin && <li><Link to="/administracija">Administracija</Link></li>}
            </ul>
            <div className="admin-section">
            <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Admin"
                    checked={isAdmin}
                    onChange={handleToggleChange}
                />
            </Form>
            </div>
        </nav>
    )
  }
  
  export default Navbar