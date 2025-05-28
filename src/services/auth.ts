export function isLoggedIn() {
  return !!localStorage.getItem('career_user');
}

export function login(username: string, password: string) {
  const users = JSON.parse(localStorage.getItem('career_users') || '{}');
  if (users[username] && users[username] === password) {
    localStorage.setItem('career_user', username);
    return true;
  }
  return false;
}

export function register(username: string, password: string) {
  const users = JSON.parse(localStorage.getItem('career_users') || '{}');
  if (users[username]) return false;
  users[username] = password;
  localStorage.setItem('career_users', JSON.stringify(users));
  localStorage.setItem('career_user', username);
  return true;
}

export function logout() {
  localStorage.removeItem('career_user');
} 