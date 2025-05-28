import React from 'react';
import { Link } from 'react-router-dom';
const NotFoundPage: React.FC = () => (
  <div className="notfound-bg">
    <div className="notfound-card">
      <h1>404</h1>
      <p>页面未找到</p>
      <Link to="/" className="career-btn">返回首页</Link>
    </div>
  </div>
);
export default NotFoundPage; 