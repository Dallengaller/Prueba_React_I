import React, { useState } from 'react';

const Buscador = ({ onSearch }) => {
  const [searchDate, setSearchDate] = useState('');

  const handleSearch = () => {
    onSearch(searchDate);
  };

  return (
    <div>
      <label>Seleccionar fecha:</label>
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default Buscador;
