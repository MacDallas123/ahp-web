import PropTypes from 'prop-types';
import alternativesData from '../../assets/phones.json';
import { useEffect, useState } from 'react';

const AlternativeScoring = ({ criteriaWeights }) => {

    const [ scoredAlternatives, setScoredAlternatives ] = useState([]);
    const [ bestAlternative, setBestAlternative ] = useState(null);

  const normalize = (value, min, max, isCost = false) => {
    if (max === min) return 1; // Éviter la division par zéro
    return isCost 
      ? (max - value) / (max - min)
      : (value - min) / (max - min);
  };

  useEffect(() => {
    // Préparer les données
    const calculateScores = () => {
        // Trouver les min/max pour chaque critère
        const criteriaExtremes = {
        memory: { min: Math.min(...alternativesData.map(a => a.memory)), max: Math.max(...alternativesData.map(a => a.memory)) },
        storage: { min: Math.min(...alternativesData.map(a => a.storage)), max: Math.max(...alternativesData.map(a => a.storage)) },
        cpu: { min: Math.min(...alternativesData.map(a => a.cpu)), max: Math.max(...alternativesData.map(a => a.cpu)) },
        price: { min: Math.min(...alternativesData.map(a => a.price)), max: Math.max(...alternativesData.map(a => a.price)) },
        // Pour la marque, nous utiliserons les préférences que vous avez déjà définies
        };

        // Calculer les scores pour chaque alternative
        return alternativesData.map(alternative => {
        // Normaliser chaque critère
        const normalized = {
            memory: normalize(alternative.memory, criteriaExtremes.memory.min, criteriaExtremes.memory.max),
            storage: normalize(alternative.storage, criteriaExtremes.storage.min, criteriaExtremes.storage.max),
            cpu: normalize(alternative.cpu, criteriaExtremes.cpu.min, criteriaExtremes.cpu.max),
            price: normalize(alternative.price, criteriaExtremes.price.min, criteriaExtremes.price.max, true), // true = critère de coût
            brand: alternative.brand === "Apple" ? 17 :
                alternative.brand === "Samsung" ? 15 :
                alternative.brand === "Google" ? 13 :
                alternative.brand === "Itel" ? 11 :
                alternative.brand === "Xiaomi" ? 9 :
                alternative.brand === "Huawei" ? 7 :
                alternative.brand === "Tecno" ? 5 :
                alternative.brand === "Infinix" ? 3 : 1
        };

        // Normaliser le score de marque (pour le mettre à la même échelle)
        normalized.brand = normalize(normalized.brand, 1, 17);

        // Calculer le score final (produit scalaire avec les poids)
        const score = (
            normalized.memory * parseFloat(criteriaWeights[0]) +
            normalized.storage * parseFloat(criteriaWeights[1]) +
            normalized.cpu * parseFloat(criteriaWeights[2]) +
            normalized.price * parseFloat(criteriaWeights[3]) +
            normalized.brand * parseFloat(criteriaWeights[4])
        ).toFixed(3);

        return {
            ...alternative,
            normalized,
            score
        };
        });
    };

    setScoredAlternatives(calculateScores());
    setBestAlternative([...scoredAlternatives].sort((a, b) => b.score - a.score)[0]);
  }, [criteriaWeights]);

  //const scoredAlternatives = calculateScores();
  //const bestAlternative? = [...scoredAlternatives].sort((a, b) => b.score - a.score)[0];

  return (
    <div className="w-full mb-8 p-4 bg-white rounded-lg shadow">
      <h2 className="font-bold text-lg mb-4 text-green-800">Évaluation des alternatives</h2>
      
      <div className="mb-6 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Alternative</th>
              <th className="border px-4 py-2">Mémoire</th>
              <th className="border px-4 py-2">Stockage</th>
              <th className="border px-4 py-2">CPU</th>
              <th className="border px-4 py-2">Prix</th>
              <th className="border px-4 py-2">Marque</th>
              <th className="border px-4 py-2 bg-green-50">Score final</th>
            </tr>
          </thead>
          <tbody>
            {scoredAlternatives.map((alt, index) => (
              <tr key={index} className={alt.name === bestAlternative?.name ? 'bg-green-50 font-medium' : ''}>
                <td className="border px-4 py-2">{alt.name}</td>
                <td className="border px-4 py-2 text-center">{alt.normalized.memory.toFixed(3)}</td>
                <td className="border px-4 py-2 text-center">{alt.normalized.storage.toFixed(3)}</td>
                <td className="border px-4 py-2 text-center">{alt.normalized.cpu.toFixed(3)}</td>
                <td className="border px-4 py-2 text-center">{alt.normalized.price.toFixed(3)}</td>
                <td className="border px-4 py-2 text-center">{alt.normalized.brand.toFixed(3)}</td>
                <td className="border px-4 py-2 text-center font-bold">{alt.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-blue-50 rounded border border-blue-200">
        <h3 className="font-bold text-lg mb-2 text-blue-800">Meilleure alternative :</h3>
        <div className="flex items-center">
          <div className="mr-4 font-bold text-xl">{bestAlternative?.name}</div>
          <div className="ml-auto bg-blue-100 px-3 py-1 rounded-full text-blue-800">
            Score: {bestAlternative?.score}
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div><span className="font-medium">Mémoire:</span> {bestAlternative?.memory}GB</div>
          <div><span className="font-medium">Stockage:</span> {bestAlternative?.storage}GB</div>
          <div><span className="font-medium">CPU:</span> {bestAlternative?.cpu}GHz</div>
          <div><span className="font-medium">Prix:</span> {bestAlternative?.price.toLocaleString()} FCFA</div>
        </div>
      </div>
    </div>
  );
};

AlternativeScoring.propTypes = {
  criteriaWeights: PropTypes.array.isRequired
};

export default AlternativeScoring;