import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import { UseAuth } from "../contexts/FalseAuthContext";
import User from "../components/User";

function AppLayout() {
  const { isAuthenticated } = UseAuth();
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {isAuthenticated ? <User /> : ""}
    </div>
  );
}

export default AppLayout;
