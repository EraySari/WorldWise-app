import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";
/* eslint-disable react/prop-types */

function CountryList() {
  const { cities } = useCities();
  const countries = cities.reduce((arr, city) => {
    //arr burda asagidaki bos küme

    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country1={country} key={country.emoji} />
      ))}
    </ul>
  );
}

export default CountryList;
