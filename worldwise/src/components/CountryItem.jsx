import styles from "./CountryItem.module.css";
/* eslint-disable react/prop-types */
function CountryItem({ country1 }) {
  const { country, emoji } = country1;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
