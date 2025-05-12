import React, { useState } from 'react';
 
const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
 
  const handleUpload = async () => {
    if (!file) return;
 
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
 
    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
 
      if (response.ok) {
        const result = await response.json();
        setMessage(`File uploaded successfully: ${result.fileName}`);
      } else {
        setMessage('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('An error occurred while uploading the file');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="upload-container">
      <h2>File Upload</h2>
      <label htmlFor="file-upload">Choose a file to upload:</label>
      <input 
        id="file-upload" 
        type="file" 
        onChange={handleFileChange} 
        aria-label="Select file for upload" 
      />
      <button onClick={handleUpload} disabled={loading || !file} title="Upload the selected file">
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      <p>{message}</p>
    </div>
  );
};
 
export default FileUpload;