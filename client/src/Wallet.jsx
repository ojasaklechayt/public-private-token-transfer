import React, { useState, useEffect } from 'react';
import server from './server';
import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1');

function generatePublicKeyFromPrivateKey(privateKey) {
  const keyPair = ec.keyFromPrivate(privateKey, 'hex');
  return keyPair.getPublic('hex');
}

function Wallet() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [privateKey, setPrivateKey] = useState('');

  async function onChange(evt) {
    const newPrivateKey = evt.target.value;
    setPrivateKey(newPrivateKey);
    const address = generatePublicKeyFromPrivateKey(newPrivateKey);
    setAddress(address);
    if (address) {
      try {
        const response = await server.get(`balance/${address}`);
        const { data: { balance } } = response;
        setBalance(balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    } else {
      setBalance(0);
    }
  }

  // You may consider using useEffect to fetch the initial balance on component mount

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address.slice(0,10)}...
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
