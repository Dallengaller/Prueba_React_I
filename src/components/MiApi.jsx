import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buscador from './Buscador';


const MiApi = () => {
  const [apodData, setApodData] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [titleList, setTitleList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = '66KgMvF0ObxohZDCTZ1c8wZFgaqWplzPnTQiRazB';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${searchDate}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setApodData(data);

        if (data && data.title && !initialLoad) {
          const isDateInList = titleList.some((item) => item.date === searchDate);
          if (!isDateInList) {
            setTitleList((prevList) => [...prevList, { title: data.title, date: searchDate }]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchDate, initialLoad]);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const handleSort = () => {
    const sortedList = [...titleList].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) return sortOrder === 'asc' ? -1 : 1;
      if (dateA > dateB) return sortOrder === 'asc' ? 1 : -1;

      return 0;
    });

    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setTitleList(sortedList);
  };

  const handleItemClick = (date) => {
    setSearchDate(date);
    setSelectedDate(date);

    const isDateInList = titleList.some((item) => item.date === date);

    if (isDateInList) {
      return;
    }

    setTitleList((prevList) => [...prevList, { title: apodData.title, date }]);
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center">

        <div className="row">
          <div className="col-md-6 d-flex justify-content-center">
            {apodData && (
              <Card className="mb-2 card_nasa" style={{ width: '100%', height: '100%', maxWidth: '30rem', flexGrow: 1, display: 'flex' }}>
                <Card.Img
                  variant="top"
                  src={apodData.url}
                  alt={apodData.title}
                  className="img_nasa"
                />
                <Card.Body style={{ flex: 1 }}>
                  <Card.Title className="h4 my-3 text-center badge bg-dark card_title">{apodData.title}</Card.Title>
                  <Card.Text className="overflow-auto text-justify" style={{ maxHeight: '100px', marginLeft: '10px' }}>
                    {apodData.explanation}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </div>
          <div className=' date_title col-md-6 d-flex flex-column align-items-center'>
            <h1 className='p-1 bg-secondary text-white title_h1' style={{ width: '100%', margin: 20, padding: 0 }}>
              Imagen Astronómica del Día
            </h1>
            <div className="mt-2 mb-2">
              <Buscador onSearch={(date) => setSearchDate(date)} />
            </div>
            <button onClick={handleSort} className="btn btn-light mt-3" >
              Ordenar por fecha {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
            <div className="mx-auto list mt-4 mb-2 ">
              <h3>Listado de imágenes vistas:</h3>
              <ul>
                {titleList.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleItemClick(item.date)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiApi;
