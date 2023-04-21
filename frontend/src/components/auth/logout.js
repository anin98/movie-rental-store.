import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const history = useNavigate();

  useEffect(() => {
    // Remove the refresh token from localStorage
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    // Redirect the user to the login page
    history('/login');
  }, []);

  return (
    <div>
      <p>You have been logged out.</p>
    </div>
  );
}

export default Logout;
