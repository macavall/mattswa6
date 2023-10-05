import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('');
  
  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchData() {
      try {
        const response = await fetch(`/api/message`, { signal: abortController.signal });
        const { text } = await response.json();
        setData(text);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Request aborted after 10 seconds.');
        } else {
          console.error('Error:', error);
        }
      }
    }
    
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 10000); // Abort the request after 10 seconds
    
    fetchData();

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, []);

  return <div>{data}</div>;
}

export default App;
