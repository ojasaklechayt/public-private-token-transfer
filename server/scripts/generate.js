const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

function generateRandomPrivateKey() {
    const keyPair = ec.genKeyPair();
    return keyPair.getPrivate('hex');
}

function generatePublicKeyFromPrivateKey(privateKey) {
    const keyPair = ec.keyFromPrivate(privateKey, 'hex');
    return keyPair.getPublic('hex');
}

async function main() {
    const privateKey = generateRandomPrivateKey();
    console.log("Private Key: ", privateKey);

    const publicKey = generatePublicKeyFromPrivateKey(privateKey);
    console.log("Public Key: ", publicKey);
}

main();
