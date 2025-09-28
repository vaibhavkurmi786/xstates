import React, { use, useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [disabledState, setDisabledState] = useState(true);
  const [disabledCity, setDisabledCity] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");


  const fetchCountries = async () => {
    try {
      const response = await fetch("https://crio-location-selector.onrender.com/countries");
      const data = await response.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country) => {
    console.log(country, "ye hai selecte country");
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
      const data = await response.json();
      console.log(data, "ye hai states data");
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };  


  useEffect(() => {
    fetchCountries();
  }, []);


  const handleCountryChange = (e) => {
    const Country = e.target.value;
    fetchStates(Country);
    setDisabledState(false);
    setSelectedCountry(Country);
  };

  const handleStateChange = (e) => {
    const State = e.target.value;
    fetchCities(selectedCountry, State);
    setDisabledCity(false);
    setSelectedState(State);
  }

  const handleCityChange = (e)=>{
    setSelectedCity(e.target.value);
  }

  return (
    <div id="container">
      <h1>Select Location</h1>
      <div id="selectBox">
        <select id="country" onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries?.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select disabled={disabledState} onChange={handleStateChange}>
          <option value="">Select State</option>
          {states?.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select disabled={disabledCity} onChange={handleCityChange}>
          <option value="">Select City</option>
          {cities?.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && selectedState && selectedCity && (
        <div id="result">
          <p><strong>You <span style={{}}>selected </span> <span style={{fontSize:'20px'}}>{selectedCity}</span></strong>,<span style={{color:"grey", fontWeight:600}}> {selectedState}, {selectedCountry}</span></p>
        </div>
      )}
    </div>
  );
};

export default App;
