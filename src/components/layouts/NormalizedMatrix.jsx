import PropTypes from 'prop-types';

const NormalizedMatrix = ({ criterias, normalizedMatrix, criteriaWeights }) => {
  return (
    <div className="w-full mb-8">
      <h2 className="font-medium mb-2">Matrice normalisée :</h2>
      <table className="border-collapse w-full mb-4">
        <thead>
          <tr>
            <th className="border px-3 py-2 bg-gray-100">Critères</th>
            {criterias.map((criteria, idx) => (
              <th key={idx} className="border px-3 py-2 bg-gray-100">{criteria}</th>
            ))}
            <th className="border px-3 py-2 bg-gray-100">Poids critère</th>
          </tr>
        </thead>
        <tbody>
          {criterias.map((criteria, rowIdx) => (
            <tr key={rowIdx}>
              <td className="border px-3 py-2 bg-gray-100 font-medium">{criteria}</td>
              {criterias?.map((_, colIdx) => (
                <td key={colIdx} className="border px-3 py-2 text-center">
                  {/* normalizedMatrix[rowIdx][colIdx] */}
                  {normalizedMatrix && normalizedMatrix[rowIdx] && normalizedMatrix[rowIdx][colIdx]}
                </td>
              ))}
              <td className="border px-3 py-2 bg-gray-50 font-medium text-center">
                {criteriaWeights[rowIdx]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

NormalizedMatrix.propTypes = {
  criterias: PropTypes.array.isRequired,
  normalizedMatrix: PropTypes.array.isRequired,
  criteriaWeights: PropTypes.array.isRequired
};

export default NormalizedMatrix;