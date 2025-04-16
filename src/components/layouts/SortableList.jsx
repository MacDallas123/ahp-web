import { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

const SortableList = ({ brands, setBrands }) => {
    const [selectedId, setSelectedId] = useState(null);
  
    useEffect(() => {
      const updatedBrands = brands.map((brand, index) => ({
        ...brand,
        preference: calculatePreference(index, brands.length)
      }));
      setBrands(updatedBrands);
    }, [brands.length]);
  
    const calculatePreference = (index, total) => {
      return 2 * (total - index) - 1;
    };
  
    const moveUp = () => {
      if (!selectedId) return;
      
      const index = brands.findIndex(item => item.id === selectedId);
      if (index <= 0) return;
      
      const newItems = [...brands];
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
      setBrands(newItems);
    };
  
    const moveDown = () => {
      if (!selectedId) return;
      
      const index = brands.findIndex(item => item.id === selectedId);
      if (index >= brands.length - 1) return;
      
      const newItems = [...brands];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      setBrands(newItems);
    };
  
    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">Ordonnez les marques selon vos préférences</h2>
        <p className="text-sm text-gray-500 mb-4">
          La marque en première position aura la préférence la plus élevée ({brands.length > 0 ? calculatePreference(0, brands.length) : 'N/A'})
        </p>
        
        <ul className="space-y-2">
          {brands?.map((item, index) => (
            <li 
              key={item.id}
              className={`
                flex items-center justify-between p-3 border rounded-lg cursor-pointer
                ${selectedId === item.id ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}
              `}
              onClick={() => setSelectedId(item.id)}
            >
              <div className="flex items-center">
                <span className="font-medium">{item.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  (Préférence: {calculatePreference(index, brands.length)})
                </span>
              </div>
              
              {selectedId === item.id && (
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveUp();
                    }}
                    disabled={index === 0}
                    className={`
                      p-1 rounded-full hover:bg-gray-100
                      ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'}
                    `}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveDown();
                    }}
                    disabled={index === brands.length - 1}
                    className={`
                      p-1 rounded-full hover:bg-gray-100
                      ${index === brands.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'}
                    `}
                  >
                    <FaArrowDown />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

SortableList.propTypes = {
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      preference: PropTypes.number.isRequired,
    })
  ).isRequired,
  setBrands: PropTypes.func.isRequired,
};

export default SortableList;