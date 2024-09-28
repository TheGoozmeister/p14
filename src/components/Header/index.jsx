import { Link } from 'react-router-dom'; 


function Header() {

    return (
        <header>
            <h1>HRnet</h1>
            <nav>
                <ul>
                    <li><Link to="/">Create Employee</Link></li>
                    <li><Link to="/employees">View Current Employees</Link></li>
                </ul>
            </nav>
        </header>
    )
}


export default Header;
