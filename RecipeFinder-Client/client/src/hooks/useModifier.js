/* eslint-disable consistent-return */
import { useState } from 'react';

const useDataModifier = () => {
  const [modifiedData, setModifiedData] = useState([]);

  function handleData(data) {
    if (data) {
      if (data.results) {
        setModifiedData(data.results);
      } else if (data.recipes) {
        setModifiedData(data.results);
      } else {
        setModifiedData(data);
      }
    }
  }

  return [
    modifiedData,
    handleData,
  ];
};

export default useDataModifier;
