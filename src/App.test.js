import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { fetchData } from './services/api';
import { loadWasm } from './wasm/average';

// Mocks
jest.mock('./services/api');
jest.mock('./wasm/average');

describe('App Component', () => {
  beforeEach(() => {
    fetchData.mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]);
    loadWasm.mockResolvedValue((sum, length) => sum / length); // Mocked wasm function
  });

  test('displays average value correctly', async () => {
    render(<App />);

    await waitFor(() => {
      // Check if average data is rendered in the chart component
      // You may need to adjust this depending on how LineChartComponent is implemented
      expect(screen.getByText('Average')).toBeInTheDocument();
    });
  });
});
