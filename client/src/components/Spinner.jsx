import React from 'react';

const Spinner = () => {
  const styles = {
    spinner: {
      border: '3px solid #f3f3f3', // Light gray border for the base
      borderTop: '3px solid #3498db', // Blue color for the spinning part
      borderRadius: '50%', // Fully rounded to make it circular
      width: '24px',
      height: '24px',
      animation: 'spin 1s linear infinite', // Spinning animation
    },
  };

  return (
    <div>
      <div style={styles.spinner}></div>
      {/* Inject the keyframes into a style tag */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;