// src/App.tsx
import React, { useState } from 'react';
import Form from './components/Form';
import ItemList from './components/ItemList';

const App: React.FC = () => {
  interface Item {
    [key: string]: string;
  }
  
  const [items, setItems] = useState<Item[]>([]);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        setItems(jsonData);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="center-container w-100">
      <h1>Jellystat Backup Splitter</h1>
      <Form onFileUpload={handleFileUpload} />
      <ItemList items={items} />
    </div>
  );
};

export default App;
