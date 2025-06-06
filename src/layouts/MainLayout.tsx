import React from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { logout } from '../services/auth';

const MainLayout: React.FC = () => {
  const username = localStorage.getItem('career_user');
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // 检查路径是否匹配当前路由
  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') {
      return true;
    }
    if (path !== '/' && currentPath.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  return (
    <div className="main-layout">
      <nav className="muzli-nav muzli-nav-transparent">
        <div className="muzli-nav-left" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span className="muzli-logo" style={{fontWeight:'900',fontSize:'2.3rem',color:'#2563eb',marginRight:'12px',lineHeight:'1'}}>职</span>
            <span className="muzli-brand" style={{color:'#333',fontSize:'1.2rem',fontWeight:'700'}}>职路通</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
            <Link 
              to="/" 
              className={`muzli-nav-link ${isActive('/') ? 'active-nav-link' : ''}`}
              style={{fontWeight:'600', color: isActive('/') ? '#2563eb' : '#333'}}
            >
              首页
            </Link>
            <Link 
              to="/interview" 
              className={`muzli-nav-link ${isActive('/interview') ? 'active-nav-link' : ''}`}
              style={{fontWeight:'600', color: isActive('/interview') ? '#2563eb' : '#333', marginLeft:'16px'}}
            >
              AI模拟面试
            </Link>
            <Link 
              to="/resume" 
              className={`muzli-nav-link ${isActive('/resume') ? 'active-nav-link' : ''}`}
              style={{fontWeight:'600', color: isActive('/resume') ? '#2563eb' : '#333', marginLeft:'16px'}}
            >
              AI简历助手
            </Link>
            <Link 
              to="/choose" 
              className={`muzli-nav-link ${isActive('/choose') ? 'active-nav-link' : ''}`}
              style={{fontWeight:'600', color: isActive('/choose') ? '#2563eb' : '#333', marginLeft:'16px'}}
            >
              AI个性化路线
            </Link>
            <Link 
              to="/position" 
              className={`muzli-nav-link ${isActive('/position') ? 'active-nav-link' : ''}`}
              style={{fontWeight:'600', color: isActive('/position') ? '#2563eb' : '#333', marginLeft:'16px'}}
            >
              个性化岗位推荐
            </Link>
          </div>
        </div>
        <div className="muzli-nav-right" style={{ display: 'flex', alignItems: 'center' }}>
          <a className="muzli-nav-link" href="#about">关于我们</a>
          <a className="muzli-nav-link" href="#product">产品</a>
          <a className="muzli-nav-link" href="#blog">博客</a>
          {username && <span className="muzli-nav-user" style={{marginLeft:'8px',fontWeight:'600'}}>{username}</span>}
          <span className="muzli-nav-link muzli-nav-logout" onClick={handleLogout} style={{cursor:'pointer',marginLeft:'16px'}}>退出</span>
        </div>
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
      
      <style>
        {`
          .muzli-nav-link {
            position: relative;
            transition: color 0.3s ease;
            padding: 6px 12px;
            text-decoration: none;
          }
          
          .muzli-nav-link::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 36px;
            height: 3px;
            background-color: #2563eb;
            border-radius: 3px;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            opacity: 0;
          }
          
          .active-nav-link::after {
            transform: translateX(-50%) scaleX(1);
            opacity: 1;
          }
          
          .muzli-nav-link:hover::after {
            opacity: 0.5;
            transform: translateX(-50%) scaleX(0.6);
          }
          
          .active-nav-link:hover::after {
            opacity: 1;
            transform: translateX(-50%) scaleX(1);
          }
          
          @keyframes fadeInScale {
            from {
              transform: translateX(-50%) scaleX(0);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) scaleX(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};
export default MainLayout; 