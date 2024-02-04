import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const MiApi = () => {
  const [apodData, setApodData] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [titleList, setTitleList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' o 'desc'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = '66KgMvF0ObxohZDCTZ1c8wZFgaqWplzPnTQiRazB';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${searchDate}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setApodData(data);

        if (data && data.title && !initialLoad) {
          setTitleList((prevList) => [...prevList, data.title]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchDate, initialLoad]);

  useEffect(() => {
    // Set initialLoad to false after the first render
    setInitialLoad(false);
  }, []);

  const handleSort = () => {
    const sortedList = [...titleList].sort();

    if (sortOrder === 'desc') {
      sortedList.reverse();
      setSortOrder('asc');
    } else {
      setSortOrder('desc');
    }

    setTitleList(sortedList);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Imagen Astronómica del Día</h1>
      <label>Seleccionar fecha:</label>
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
      />
      {apodData && (
        <Card className="mb-6" style={{ maxWidth: '50rem' }}>
          <Card.Img variant="top" src={apodData.url} alt={apodData.title} className="img-fluid" />
          <Card.Body>
            <Card.Title className="h4 text-center">{apodData.title}</Card.Title>
            <Card.Text >{apodData.explanation}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <div className="mx-auto">
        <h3>Lista de Títulos:</h3>
        <ul>
          {titleList.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
        <button onClick={handleSort}>
          Ordenar Lista {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
        </button>
      </div>
    </div>
  );
};

export default MiApi;
