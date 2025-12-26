
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn md5_hex(input: &str) -> String {
    let digest = md5::compute(input.as_bytes());
    format!("{:x}", digest) // e.g., "5d41402abc4b2a76b9719d911017c592" for "hello"
}

/// Computes MD5 hex of raw bytes (e.g., photo file contents).
#[wasm_bindgen]
pub fn md5_bytes(bytes: &[u8]) -> String {
    let digest = md5::compute(bytes);
    format!("{:x}", digest)
}
