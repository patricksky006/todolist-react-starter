import { Link, useNavigate } from 'react-router-dom';
import { AuthLinkText } from 'components/common/auth.styled';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos')
    } else {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div>
      HomePage
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
      <Link to="/login">
        <AuthLinkText>登入</AuthLinkText>
      </Link>
    </div>
  );
};

export default HomePage;
