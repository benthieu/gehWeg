import { faList, faMap, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

export function NavBar() {
  return (
    <ul>
      <li>
        <NavLink
          to="/"
          style={(isActive) => ({
            color: isActive ? 'active' : '',
          })}
        >
          <FontAwesomeIcon icon={faMap} />
          <span>Karte</span>
        </NavLink>
        <Link to="/"></Link>
      </li>
      <li>
        <NavLink
          to="/list"
          style={(isActive) => ({
            color: isActive ? 'active' : '',
          })}
        >
          <FontAwesomeIcon icon={faList} />
          <span>Liste</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile"
          style={(isActive) => ({
            color: isActive ? 'active' : '',
          })}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>Profil</span>
        </NavLink>
      </li>
    </ul>
  );
}

export default NavBar;
