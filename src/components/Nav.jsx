import { NavLink } from "react-router-dom";
function Nav() {
  return (
    <nav>
      <div>
        <NavLink
          to='/banks'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Banks
        </NavLink>
      </div>
      <div>
        <NavLink
          to='/calculator'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Calculator
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav;
