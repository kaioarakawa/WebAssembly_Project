export async function loadWasm() {
  try {
    const response = await fetch('/wasm/average.wasm');
    const buffer = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(buffer);
    
    return instance.exports.calculate_average;
  } catch (error) {
    console.error('Error loading WebAssembly:', error);
  }
}
