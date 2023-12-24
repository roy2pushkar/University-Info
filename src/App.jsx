import React, { useState } from "react";
import Select from "react-select";
import useCountries from "./Hooks/useCountries";
import useUniversities from "./Hooks/useUniversities";

const App = () => {
  const [countryName, setCountryName] = useState({ value: "", label: "" });
  const { loading: universitiesLoading, error: universitiesError, country: universities } = useUniversities(countryName.value);

  const { loading: countryOptionsLoading, error: countryOptionsError, countryOptions } = useCountries();
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleSearch = () => {
    if (countryName.value.trim() === "") {
      alert("Please enter a valid country name before searching.");
      return;
    }
    setCountryName({ value: countryName.value, label: countryName.value });
    // Clear selected university when searching
    setSelectedUniversity(null);
  };

  const handleInputChange = (selectedOption) => {
    setCountryName(selectedOption);
    // Clear selected university when changing the country
    setSelectedUniversity(null);
  };

  const handleUniversityClick = (university) => {
    // Toggle selected university on click
    setSelectedUniversity(selectedUniversity === university ? null : university);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Universities Information</h1>

      <div className="flex space-x-2 mb-4">
        <Select
          options={countryOptions}
          value={countryName}
          onChange={handleInputChange}
          className="w-64"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </div>

      {universitiesLoading && <p className="text-gray-600">Loading universities...</p>}
      {universitiesError && <p className="text-red-500">{universitiesError}</p>}

      {countryOptionsLoading && <p className="text-gray-600">Loading countries...</p>}
      {countryOptionsError && <p className="text-red-500">{countryOptionsError}</p>}

      {universities && (
        <div>
          <h2>Universities Data:</h2>
          <ul>
            {universities.map((university) => (
              <li
                key={`${university.name}-${university.country}`}
                onClick={() => handleUniversityClick(university)}
                className={`bg-white border p-2 my-2 rounded-md shadow-md cursor-pointer ${
                  selectedUniversity === university ? "bg-blue-200" : ""
                }`}
              >
                {university.name} - {university.country}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Render additional information about the selected university */}
     {selectedUniversity && (
  <div>
    <h2>Selected University Details:</h2>
    <p>Name: {selectedUniversity.name}</p>
    <p>Country: {selectedUniversity.country}</p>
    <p>Country: {selectedUniversity.alpha_two_code}</p>
    {/* Add more details as needed */}
  </div>
)}
{console.log("Selected University:", selectedUniversity)}

    </div>
  );
};

export default App;
