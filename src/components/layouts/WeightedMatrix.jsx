import PropTypes from 'prop-types';

const WeightedMatrix = ({ criterias, weightedMatrix, rowSums }) => {
  return (
    <div className="w-full mb-8">
      <h2 className="font-medium mb-2">Matrice pondérée :</h2>
      <table className="border-collapse w-full mb-4">
        <thead>
          <tr>
            <th className="border px-3 py-2 bg-gray-100">Critères</th>
            {criterias.map((criteria, idx) => (
              <th key={idx} className="border px-3 py-2 bg-gray-100">{criteria}</th>
            ))}
            <th className="border px-3 py-2 bg-gray-100">Somme des poids</th>
          </tr>
        </thead>
        <tbody>
          {criterias.map((criteria, rowIdx) => (
            <tr key={rowIdx}>
              <td className="border px-3 py-2 bg-gray-100 font-medium">{criteria}</td>
              {criterias.map((_, colIdx) => (
                <td key={colIdx} className="border px-3 py-2 text-center">
                  {/* {weightedMatrix[rowIdx][colIdx]} */}
                  {weightedMatrix && weightedMatrix[rowIdx] && weightedMatrix[rowIdx][colIdx]}
                </td>
              ))}
              <td className="border px-3 py-2 bg-gray-50 font-medium text-center">
                {rowSums[rowIdx]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

WeightedMatrix.propTypes = {
  criterias: PropTypes.array.isRequired,
  weightedMatrix: PropTypes.array.isRequired,
  rowSums: PropTypes.array.isRequired
};

export default WeightedMatrix;