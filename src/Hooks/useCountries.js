import { useState, useEffect } from "react";

const useCountries = () => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchCountryOptions = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const countries = await response.json(); // Corrected syntax for json()
        console.log(countries);

        const formattedCountries = countries.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));

        setCountryOptions(formattedCountries);
      } catch (error) {
        console.error("Error Fetching Countries:", error);
        setError("Error Fetching Countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryOptions();
  }, []);

  return {
    loading,
    error,
    countryOptions,
  };
};

export default useCountries;
