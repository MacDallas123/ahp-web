import PropTypes from 'prop-types';
import { useEffect } from 'react';

const PairWiseTable = ({ criterias, pairwiseMatrix, setPairwiseMatrix }) => {
    // Initialiser la matrice si vide
    useEffect(() => {
        if (pairwiseMatrix.length === 0 && criterias.length > 0) {
            const initialMatrix = Array(criterias.length).fill().map(() => Array(criterias.length).fill(''));
            // Remplir la diagonale avec des 1
            for (let i = 0; i < criterias.length; i++) {
                initialMatrix[i][i] = '1';
            }
            setPairwiseMatrix(initialMatrix);
        }
    }, [criterias, pairwiseMatrix.length, setPairwiseMatrix]);

    const handleInputChange = (rowIdx, colIdx, value) => {
        // Validation : seulement les nombres positifs
        if (value && !/^\d*\.?\d*$/.test(value)) return;
        
        const newMatrix = pairwiseMatrix.map(row => [...row]);
        
        // Mettre à jour la valeur dans la matrice
        newMatrix[rowIdx][colIdx] = value;
        
        // Mettre à jour la valeur symétrique (inverse)
        if (rowIdx !== colIdx) {
            newMatrix[colIdx][rowIdx] = value ? (1 / parseFloat(value)).toString() : '';
        }
        
        setPairwiseMatrix(newMatrix);
    };

    return (
        <table className="border-collapse w-full">
            <thead>
                <tr>
                    <th className="border px-3 py-2 bg-gray-100">Critères</th>
                    {criterias?.map((criteria, idx) => (
                        <th key={idx} className="border px-3 py-2 bg-gray-100">{criteria}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {criterias?.map((criteria, rowIdx) => (
                    <tr key={rowIdx}>
                        <td className="border px-3 py-2 bg-gray-100 font-medium">{criteria}</td>
                        {Array(criterias.length).fill(null).map((_, colIdx) => {
                            // Cellules diagonales (lecture seule)
                            if (rowIdx === colIdx) {
                                return (
                                    <td key={colIdx} className="border px-3 py-2 bg-gray-50 text-center">
                                        <input
                                            type="text"
                                            className="w-12 text-center bg-transparent"
                                            value={pairwiseMatrix[rowIdx]?.[colIdx] || '1'}
                                            readOnly
                                        />
                                    </td>
                                );
                            }
                            // Cellules sous la diagonale (lecture seule, valeur inverse)
                            else if (rowIdx > colIdx) {
                                return (
                                    <td key={colIdx} className="border px-3 py-2 bg-gray-50 text-center">
                                        <input
                                            type="text"
                                            className="w-12 text-center bg-transparent"
                                            value={pairwiseMatrix[rowIdx]?.[colIdx] || ''}
                                            readOnly
                                        />
                                    </td>
                                );
                            }
                            // Cellules au-dessus de la diagonale (modifiables)
                            else {
                                return (
                                    <td key={colIdx} className="border px-3 py-2 text-center">
                                        <input
                                            type="text"
                                            className="w-12 text-center border rounded px-1 py-1"
                                            value={pairwiseMatrix[rowIdx]?.[colIdx] || ''}
                                            onChange={(e) => handleInputChange(rowIdx, colIdx, e.target.value)}
                                            placeholder="1-9"
                                        />
                                    </td>
                                );
                            }
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

PairWiseTable.propTypes = {
    criterias: PropTypes.array.isRequired,
    pairwiseMatrix: PropTypes.array.isRequired,
    setPairwiseMatrix: PropTypes.func.isRequired
};

export default PairWiseTable;