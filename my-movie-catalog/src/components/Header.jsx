import React from 'react';

export default function Header() {
  return (
    <header style={{ 
      padding: '20px', 
      backgroundColor: '#222', 
      textAlign: 'center',
      borderBottom: '2px solid #ff4757',
      marginBottom: '20px'
    }}>
      <h1 style={{ margin: 0, color: '#ff4757' }}>IVAN SENKIV MOVIE DB</h1>
      <p style={{ color: '#aaa' }}>Лабораторна робота №6 — React Components & Hooks</p>
    </header>
  );
}