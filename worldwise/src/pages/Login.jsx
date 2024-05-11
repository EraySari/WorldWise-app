import PageNav from "../components/PageNav";
import { UseAuth } from "../contexts/FalseAuthContext";
import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated } = UseAuth();

  //login butonuna tikladigimizda useAuth tan aldigimiz login fonksiyonunu devreye sokuyoruz. Bu fonksiyon
  //user, isAuthenticatedi degistiriyor. Asagidaki useEffect ilede eger isAuthenticated degisirse
  //isAuthenticated === true sorgusu (yani basarili giris) yapiyoruz. Basarili giris ise app componentine atiyoruz
  //daha sonra AppLayoutta {isAuthenticated ? <User /> : ""} sorgusu yapiyoruz.Giris yapildiysa bilileri ve logout tusu icin
  // <User> icinde user verisini cekiyoruz useAuth ile ve bilgileri yazdiriyoruz. Cikis yapilirsa logout fonk. cagrilip navigate ile / maine atiyoruz kullaniciiýi
  const handleSubmit = function (e) {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  const navigate = useNavigate();
  useEffect(
    function () {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        navigate("/app");
      }
    },
    [isAuthenticated]
  );
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
