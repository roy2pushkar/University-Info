import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const UniversityPopup = ({ selectedUniversity, onClose }) => {
  if (!selectedUniversity) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md mb-4">
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          Close
        </button>
        <div className="mt-8 flex flex-col justify-center items-center text-white">
          <h2 className="text-2xl font-bold mb-2">Selected University Details:</h2>
          <p><span className="font-semibold">Name:</span> {selectedUniversity.name}</p>
          <p><span className="font-semibold">Country:</span> {selectedUniversity.country}</p>
          <p><span className="font-semibold">Code of Country:</span> {selectedUniversity.alpha_two_code}</p>
          <p>
            <span className="font-semibold">Domains:</span>{' '}
            {selectedUniversity.domains && selectedUniversity.domains.map((domain, index) => (
              <a key={index} href={`http://${domain}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-blue-700">
                {domain}
              </a>
            ))}
          </p>
             
          <p>
            <span className="font-semibold">Websites:</span>{' '}
            {selectedUniversity.web_pages && selectedUniversity.web_pages.map((webPage, index) => (
              <a key={index} href={`http://${webPage}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-blue-700">
                {webPage}
              </a>
            ))}
          </p>
          <p><span className="font-semibold">State:</span> {selectedUniversity.state_province}</p>
          {/* Add more details as needed */}
        </div>
        {/* ... (other details) */}
      </div>
    </div>
  );
};

UniversityPopup.propTypes = {
  selectedUniversity: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    alpha_two_code: PropTypes.string,
    domains: PropTypes.arrayOf(PropTypes.string),
    web_pages: PropTypes.arrayOf(PropTypes.string),
    state_province: PropTypes.string,
    // Add more PropTypes as needed for other details
  }),
  onClose: PropTypes.func.isRequired,
};

export default UniversityPopup;
