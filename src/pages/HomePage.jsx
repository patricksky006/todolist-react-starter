import { Link } from 'react-router-dom';
import { AuthLinkText } from 'components/common/auth.styled';

const HomePage = () => {
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
