/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlLocation } from "../hooks/useUrlLocation";
import Message from "./Message";

import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState();

  const [date, setDate] = useState(
    new Date().getDate() +
      "/" +
      new Date().getMonth() +
      "/" +
      new Date().getFullYear()
  );
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [lat, lng] = useUrlLocation();
  const [geoCodingError, setGeoCodingError] = useState("");

  const { createCity, isLoading } = useCities();

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
  useEffect(
    function () {
      async function getUrlCity() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoCodingError("");
          const res = await fetch(
            `${BASE_URL}latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));

          if (!data.countryCode) {
            throw new Error(`That doesn't seem to be a city. Click on a city`);
          }
        } catch (error) {
          setGeoCodingError(error.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      getUrlCity();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity); //await ekliyoruz cünkü altaki navigate hemen city listesine gidiyordu.Bizde bekliyoruz yükledikten sonra gidiyoruz böylece biraz bekliyor
    navigate(-1);
  }

  //yukardaki datanin yüklenmesini beklerken(async) spinner veriyoruz. Data yüklenince setCityname vs den dolayi tekrar compnent yüklenir ve burasini gecer
  if (isLoadingGeoCoding) return <Spinner />;
  if (!lng && !lat)
    return <Message message="Start by clicking somewhere on the map" />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="primary" onClick={(e) => handleSubmit(e)}>
          Add
        </Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
