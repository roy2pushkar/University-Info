import { useEffect, useState } from "react";

const useUniversities = (name) => {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Initialize error state as null

  useEffect(() => {
    const fetchUniversityInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://universities.hipolabs.com/search?country=${name}`
        );

        if (!response.ok) {
          // Handle non-successful response
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Log the structure of a single university for troubleshooting
        console.log(
          "University data structure:",
          data.length > 0 ? data[0] : null
        );

        setCountry(data);
      } catch (error) {
        console.error("Error fetching universities:", error);
        setError("Error fetching universities. Please try again later."); // Set a generic error message
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityInfo();
  }, [name]);

  return {
    loading,
    error,
    country,
  };
};

export default useUniversities;
