import Header from "./components/layouts/Header";
import './App.css';
import { FaPaperclip } from "react-icons/fa";
import SortableList from "./components/layouts/SortableList";
import { useEffect, useState } from "react";
import PairWiseTable from "./components/layouts/PairwiseTable";
import AhpProcess from "./components/layouts/AhpProcess";

let phoneBrands = [
  { id: 1, name: "Apple", preference: 17 },
  { id: 2, name: "Samsung", preference: 15 },
  { id: 3, name: "Google", preference: 13 },
  { id: 4, name: "Itel", preference: 11 },
  { id: 5, name: "Xiaomei", preference: 9 },
  { id: 6, name: "Huawei", preference: 7 },
  { id: 7, name: "Tecno", preference: 5 },
  { id: 8, name: "Infinix", preference: 3 },
  { id: 9, name: "Motorola", preference: 1 }
];

const criterias = [ "Mémoire" , "Stockage", "CPU", "Prix", "Marque" ];

const App = () => {
  const [ brands, setBrands ] = useState(phoneBrands);
  const [ pairwiseMatrix, setPairwiseMatrix ] = useState([]);

  useEffect(() => {
    console.log("UPDATED BRANDS PREFERENCES", brands);
  }, [brands])

  return (
    <div className="items-center flex flex-col h-screen bg-gray-100 overflow-auto">
      <Header />

      <div className="w-[95%] md:w-[80%] lg:w-[60%] p-4 flex flex-col items-start justify-center mt-4 mb-4">
        <h1 className="text-green-800 text-lg md:text-2xl underline flex flex-row items-center justify-center mb-4">
          <FaPaperclip className="mr-3"/> Echelle de préférences
        </h1>

        <SortableList brands={brands} setBrands={setBrands} />

        <h1 className="text-green-800 text-lg md:text-2xl underline flex flex-row items-center justify-center mb-4 mt-10">
          <FaPaperclip className="mr-3"/> Matrice de comparaison des critères
        </h1>

        <PairWiseTable 
          criterias={criterias} 
          pairwiseMatrix={pairwiseMatrix} 
          setPairwiseMatrix={setPairwiseMatrix} 
        />

        <h1 className="text-green-800 text-lg md:text-2xl underline flex flex-row items-center justify-center mb-4 mt-10">
          <FaPaperclip className="mr-3"/> Utilisation de AHP
        </h1>

        <AhpProcess criterias={criterias} brands={brands} pairwiseMatrix={pairwiseMatrix} />
      </div>
    </div>
  );
};

export default App;