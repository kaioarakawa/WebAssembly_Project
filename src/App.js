import React, { useState, useEffect } from 'react';
import { fetchData } from './services/api';
import { loadWasm } from './wasm/average';
import LineChartComponent from './components/LineChart/LineChart.js';
import ReactLoading from 'react-loading';
import './App.css'; // Inclua o CSS para estilos

const App = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const apiData = await fetchData();
        const wasmModule = await loadWasm();
        const numbers = apiData.map(item => item.id); // Mock transformation
        const average = wasmModule(numbers.reduce((a, b) => a + b, 0), numbers.length);
        
        setData(apiData);
        setChartData([{ name: 'Average', value: average }]);
      } catch (error) {
        console.error('Error fetching data or loading wasm module', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <ReactLoading type="spin" color="#007bff" />
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Data Visualization</h1>
      <div className="line-chart-container">
        <LineChartComponent data={chartData} />
      </div>
    </div>
  );
};

export default App;
