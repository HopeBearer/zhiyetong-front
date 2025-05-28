import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/auth';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (register(username, password)) {
        navigate('/');
      } else {
        setError('用户名已存在');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="auth-bg auth-vertical-center">
      <div className="platform-title platform-title-standalone">职路通：就业导向型学习与精准匹配平台</div>
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>注册</h2>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="auth-error">{error}</div>}
        <button className="career-btn" type="submit" disabled={loading}>
          {loading ? '注册中...' : '注册'}
        </button>
        <div className="auth-switch auth-switch-link">
          已有账号？
          <Link to="/login" className="auth-link-text">登录</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage; 