// src/wasm.js
const wasmModule = import('./wasm/average.js');

export const calculateAverage = async (numbers) => {
  const module = await wasmModule;
  const calculate = module.cwrap('calculate_average', 'number', ['array', 'number']);
  console.log(calculate);
  return calculate(new Float64Array(numbers), numbers.length);
};
