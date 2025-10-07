import React from 'react';

const AnalyticsView = () => {
  return (
    <div className="analytics-view">
      <h2>📈 Sales Analytics</h2>
      <div className="analytics-placeholder">
        <p>View your sales performance and insights.</p>
        <p>Track revenue, popular products, and customer trends.</p>
        
        <div className="sample-analytics">
          <h3>Sample Analytics (Coming Soon)</h3>
          <div className="analytics-cards">
            <div className="analytics-card">
              <h4>Total Revenue</h4>
              <p>R0.00</p>
            </div>
            <div className="analytics-card">
              <h4>Products Sold</h4>
              <p>0</p>
            </div>
            <div className="analytics-card">
              <h4>Active Customers</h4>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;