import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WeightedMatrix from './WeightedMatrix';
import NormalizedMatrix from './NormalizedMatrix';
import ConsistencyCalculation from './ConsistencyCalculation';
import AlternativeScoring from './AlternativeScoring';

const AhpProcess = ({ criterias, brands, pairwiseMatrix }) => {
  const [columnSums, setColumnSums] = useState([]);
  const [normalizedMatrix, setNormalizedMatrix] = useState([]);
  const [criteriaWeights, setCriteriaWeights] = useState([]);
  const [weightedMatrix, setWeightedMatrix] = useState([]);
  const [rowSums, setRowSums] = useState([]);

  useEffect(() => {
    if (pairwiseMatrix.length > 0 && criterias.length > 0) {
      // Calcul des sommes de colonnes et normalisation
      const sums = Array(criterias.length).fill(0);
      const normalized = Array(criterias.length).fill().map(() => Array(criterias.length).fill(0));
      const weights = Array(criterias.length).fill(0);
      
      // Calcul des sommes de colonnes
      for (let col = 0; col < criterias.length; col++) {
        let sum = 0;
        for (let row = 0; row < criterias.length; row++) {
          const value = parseFloat(pairwiseMatrix[row][col]) || 0;
          sum += value;
        }
        sums[col] = sum;
      }
      
      // Normalisation et calcul des poids
      for (let row = 0; row < criterias.length; row++) {
        let rowSum = 0;
        for (let col = 0; col < criterias.length; col++) {
          const value = parseFloat(pairwiseMatrix[row][col]) || 0;
          normalized[row][col] = sums[col] !== 0 ? (value / sums[col]).toFixed(3) : '0.000';
          rowSum += parseFloat(normalized[row][col]) || 0;
        }
        weights[row] = (rowSum / criterias.length).toFixed(3);
      }
      
      // Calcul de la matrice pondérée et des sommes de lignes
      const weighted = Array(criterias.length).fill().map(() => Array(criterias.length).fill(0));
      const sumsRow = Array(criterias.length).fill(0);
      
      for (let row = 0; row < criterias.length; row++) {
        let sum = 0;
        for (let col = 0; col < criterias.length; col++) {
          const value = parseFloat(normalized[row][col]) * parseFloat(weights[col]);
          weighted[row][col] = value.toFixed(3);
          sum += value;
        }
        sumsRow[row] = sum.toFixed(3);
      }
      
      setColumnSums(sums);
      setNormalizedMatrix(normalized);
      setCriteriaWeights(weights);
      setWeightedMatrix(weighted);
      setRowSums(sumsRow);
    }
  }, [pairwiseMatrix, criterias]);

  return (
    <div>
      {/* Affichage des sommes de colonnes */}
      {pairwiseMatrix.length > 0 && (
        <div className="w-full mb-6 mt-4">
          <h2 className="font-medium mb-2">Somme des colonnes :</h2>
          <div className="flex gap-4 flex-wrap">
            {criterias.map((criteria, index) => (
              <div key={index} className="bg-white p-2 rounded shadow">
                <span className="font-semibold">{criteria}: </span>
                <span>{columnSums[index]?.toFixed(2) || '0.00'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <NormalizedMatrix 
        criterias={criterias} 
        normalizedMatrix={normalizedMatrix} 
        criteriaWeights={criteriaWeights} 
      />

      <WeightedMatrix 
        criterias={criterias} 
        weightedMatrix={weightedMatrix} 
        rowSums={rowSums} 
      />

      <ConsistencyCalculation 
        criterias={criterias} 
        criteriaWeights={criteriaWeights} 
        rowSums={rowSums}
      />

      <AlternativeScoring 
        criteriaWeights={criteriaWeights}
        brands={brands}
      />
    </div>
  );
};
AhpProcess.propTypes = {
  criterias: PropTypes.arrayOf(PropTypes.string).isRequired,
  pairwiseMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default AhpProcess;