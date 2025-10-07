import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const SimpleTest = () => {
  const { user } = useAuth();
  
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Auth Test</h1>
      <p>User: {user ? user.name : 'Not logged in'}</p>
      <button onClick={() => alert('Auth context works!')}>
        Test Auth
      </button>
    </div>
  );
};

export default SimpleTest;