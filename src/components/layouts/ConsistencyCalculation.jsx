import PropTypes from 'prop-types';

const RI_VALUES = {
  1: 0,
  2: 0,
  3: 0.58,
  4: 0.9,
  5: 1.12,
  6: 1.24,
  7: 1.32,
  8: 1.41,
  9: 1.45,
  10: 1.49
};

const ConsistencyCalculation = ({ criterias, criteriaWeights,  rowSums }) => {
  // Calcul des lambdas individuels
  const lambdas = criterias.map((_, index) => {
    const weight = parseFloat(criteriaWeights[index]) || 1;
    const rowSum = parseFloat(rowSums[index]) || 1;
    return (rowSum / weight).toFixed(3);
  });

  // Calcul de lambda max
  const lambdaMax = lambdas.reduce((sum, lambda) => sum + parseFloat(lambda), 0) / criterias.length;

  // Calcul de l'indice de cohérence (CI)
  const CI = (lambdaMax - criterias.length) / (criterias.length - 1);

  // Récupération de la valeur RI
  const RI = RI_VALUES[criterias.length] || 1.49;

  // Calcul du ratio de cohérence (CR)
  const CR = CI / RI;

  return (
    <div className="w-full mb-8 p-4 bg-white rounded-lg shadow">
      <h2 className="font-bold text-lg mb-4 text-green-800">Calcul de consistance</h2>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">lambda(i) pour chaque critère :</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {criterias.map((criteria, index) => (
            <div key={index} className="bg-gray-50 p-2 rounded border">
              <span className="font-semibold">{criteria}: </span>
              <span>{lambdas[index]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">lambda<sub>max</sub>:</span>
          <span>{lambdaMax.toFixed(3)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Indice de cohérence (CI):</span>
          <span>{CI.toFixed(3)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Indice aléatoire (RI):</span>
          <span>{RI.toFixed(3)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Ratio de consistance (CR):</span>
          <span className={CR < 0.1 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
            {CR.toFixed(3)} {CR < 0.1 ? '(Acceptable)' : '(Inacceptable - Revoir les comparaisons)'}
          </span>
        </div>
      </div>
    </div>
  );
};

ConsistencyCalculation.propTypes = {
  criterias: PropTypes.array.isRequired,
  criteriaWeights: PropTypes.array.isRequired,
  rowSums: PropTypes.array.isRequired
};

export default ConsistencyCalculation;