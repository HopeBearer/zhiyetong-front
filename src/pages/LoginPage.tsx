import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';

const LoginPage: React.FC = () => {
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
      if (login(username, password)) {
        navigate('/');
      } else {
        setError('用户名或密码错误');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="auth-bg">
      <div className="platform-title platform-title-standalone">职路通：就业导向型学习与精准匹配平台</div>
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>登录</h2>
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
          {loading ? '登录中...' : '登录'}
        </button>
        <div className="auth-switch auth-switch-link">
          没有账号？
          <Link to="/register" className="auth-link-text">注册</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage; 