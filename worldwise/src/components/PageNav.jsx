import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
function PageNav() {
  return (
    <div>
      <nav className={styles.nav}>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <ul>
          <li>
            {
              <NavLink to="/pricing">
                Pricing
              </NavLink> /* linkde kullanilabilirdi ama navlink ile hangi componentte oldugumuzu bilebiliyoruz */
            }
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageNav;
