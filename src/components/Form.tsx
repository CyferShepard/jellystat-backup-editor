// src/components/Form.tsx
import React, { ChangeEvent } from 'react';

interface FormProps {
  onFileUpload: (file: File) => void;
}

const Form: React.FC<FormProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
    </div>
  );
};

export default Form;
