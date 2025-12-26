
// index.js
const fs = require('fs');
const crypto = require('crypto');

// Import the wasm package built by wasm-pack
// Adjust the relative path if your layout differs.
const rust = require('./rust_md5_wasm/pkg/rust_md5_wasm');

function md5Photo(path) {
    // Read the entire file into memory (simple approach)
    const buf = fs.readFileSync(path); // Buffer
    // Node Buffer is Uint8Array-compatible; pass directly
    let start = performance.now();
    const data =  rust.md5_bytes(buf);
    let end = performance.now();
    console.log("time taken by RUST Wasm: ", end - start, "ms - ", data);

    start = performance.now();
    const hash = crypto.createHash('md5').update(buf).digest('hex');
    end = performance.now();
    console.log("time taken by JS: ", end - start, "ms - ", hash);

    return data;
}

const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node index.js <photo-path>');
    process.exit(1);
}

const md5 = md5Photo(filePath);
console.log(`MD5(${filePath}) = ${md5}`);
