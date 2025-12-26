
// index.js
const fs = require('fs');

// Import the wasm package built by wasm-pack
// Adjust the relative path if your layout differs.
const rust = require('./rust_md5_wasm/pkg/rust_md5_wasm');

function md5Photo(path) {
    // Read the entire file into memory (simple approach)
    const buf = fs.readFileSync(path); // Buffer
    // Node Buffer is Uint8Array-compatible; pass directly
    const start = performance.now();
    const data =  rust.md5_bytes(buf);
    const end = performance.now();
    console.log("time taken: ", end - start, "ms");
    return data;
}

const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node index.js <photo-path>');
    process.exit(1);
}

const md5 = md5Photo(filePath);
console.log(`MD5(${filePath}) = ${md5}`);
