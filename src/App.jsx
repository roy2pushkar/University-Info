// App.jsx

import React, { useState } from 'react';
import Select from 'react-select';
import useCountries from './Hooks/useCountries';
import useUniversities from './Hooks/useUniversities';
import UniversityPopup from './components/UniversityPopup';

const App = () => {
  const [countryName, setCountryName] = useState({ value: '', label: '' });
  const { loading: universitiesLoading, error: universitiesError, country: universities } = useUniversities(countryName.value);

  const { loading: countryOptionsLoading, error: countryOptionsError, countryOptions } = useCountries();
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchQuery , setSearchQuery] = useState(' ');

  const handleSearch = () => {
    if (countryName.value.trim() === '') {
      alert('Please enter a valid country name before searching.');
      return;
    }

    setCountryName({ value: countryName.value, label: countryName.value });
    // Clear selected university when searching
    setSelectedUniversity(null);
  };
 
   const handleSearchUniversity = () => {
   // Set the search query to the entered value
    setSearchQuery(countryName.value);
   }

  const handleInputChange = (selectedOption) => {
    setCountryName(selectedOption);

     
    // Clear selected university when changing the country
   
    setSelectedUniversity(null);
  };

  const handleUniversityClick = (university) => {
    // Toggle selected university on click
    setSelectedUniversity(selectedUniversity === university ? null : university);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={` ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="ml-[149px] mr-[150px]">
        <h1 className="text-3xl font-bold mb-4">Universities Information</h1>

        <div className="flex space-x-2 mb-4">
          <Select
            options={countryOptions}
            value={countryName}
            onChange={handleInputChange}
            isSearchable={true} // Enable search functionality
            placeholder="Search country..."
            className="w-64"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: isDarkTheme ? '#2b2b2b' : '#ffffff',
                borderColor: isDarkTheme ? '#2b2b2b' : '#d1d1d1',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: isDarkTheme ? '#ffffff' : '#000000',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#1a1a1a' : (isDarkTheme ? '#2b2b2b' : '#ffffff'),
                color: state.isSelected ? '#ffffff' : (isDarkTheme ? '#ffffff' : '#000000'),
                '&:hover': {
                  backgroundColor: state.isSelected ? '#1a1a1a' : (isDarkTheme ? '#2b2b2b' : '#f0f0f0'),
                },
              }),
            }}
          />
          <button
            onClick={handleSearch}
            className={`px-4 py-2 ${isDarkTheme ? 'bg-blue-500' : 'bg-blue-200'} text-white rounded-md hover:${isDarkTheme ? 'bg-blue-600' : 'bg-blue-300'} focus:outline-none focus:ring focus:border-blue-300`}
          >
            Search
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search university..."
            className="px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleSearchUniversity}
            className={`px-4 py-2 ${isDarkTheme ? 'bg-blue-500' : 'bg-blue-200'} text-white rounded-md hover:${isDarkTheme ? 'bg-blue-600' : 'bg-blue-300'} focus:outline-none focus:ring focus:border-blue-300`}
          >
            Search
          </button>

          <button
            onClick={toggleTheme}
            className={`px-4 py-2 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} text-white rounded-md hover:${isDarkTheme ? 'bg-gray-700' : 'bg-gray-400'} focus:outline-none focus:ring focus:border-gray-300 ml-2`}
          >
            {isDarkTheme ? 'Bright' : 'Dark'} Theme
          </button>
        </div>

        {/* University popup component */}
        <UniversityPopup
          selectedUniversity={selectedUniversity}
          onClose={() => setSelectedUniversity(null)}
        />

        {/* Additional information about the selected university */}
        {universitiesLoading && <p className="text-gray-600">Loading universities...</p>}
        {universitiesError && <p className="text-red-500">{universitiesError}</p>}

        {countryOptionsLoading && <p className="text-gray-600">Loading countries...</p>}
        {countryOptionsError && <p className="text-red-500">{countryOptionsError}</p>}

        {universities && (
          <div>
            <h2 className={isDarkTheme ? 'text-white' : 'text-black'}>Universities Data:</h2>
            <ul>
              {universities.map((university) => (
                <li
                  key={`${university.name}-${university.country}`}
                  onClick={() => handleUniversityClick(university)}
                  className={`border p-3 my-3 rounded-md shadow-md cursor-pointer ${isDarkTheme ? 'bg-dark' : 'bg-white'} ${
                    selectedUniversity === university ? 'bg-blue-200' : ''
                  }`}
                >
                  {university.name} - {university.country}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
