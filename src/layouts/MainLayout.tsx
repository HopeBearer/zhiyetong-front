import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const MainLayout: React.FC = () => {
  const username = localStorage.getItem('career_user');
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="main-layout">
      <nav className="muzli-nav muzli-nav-transparent">
        <div className="muzli-nav-left">
          <span className="muzli-logo" style={{fontWeight:'900',fontSize:'2.3rem',color:'#2563eb',marginRight:'12px',lineHeight:'1'}}>职</span>
          <span className="muzli-brand">职路通</span>
        </div>
        <div className="muzli-nav-right">
          <a className="muzli-nav-link" href="#about">关于我们</a>
          <a className="muzli-nav-link" href="#product">产品</a>
          <a className="muzli-nav-link" href="#blog">博客</a>
          <span className="muzli-nav-user">{username}</span>
          <span className="muzli-nav-link muzli-nav-logout" onClick={handleLogout} style={{cursor:'pointer'}}>退出</span>
        </div>
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout; 