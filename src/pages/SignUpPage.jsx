import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {register} from '../api/auth'
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const SignUpPage = () => {
  const [username, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // 取出需要的狀態與方法

  const handleRegisterClick = async () => {
    if (username.length === 0 || password.length === 0 || email.length === 0) {
      return Swal.fire({
        title: '錯誤',
        text: '請勿在帳號、信箱或密碼欄位中輸入空白值',
        icon: 'error',
        confirmButtonText: '確認',
      });
    }
    const { success, authToken, message } = await register({
      username,
      email,
      password,
    });

    if (success) {
      localStorage.setItem('authToken', authToken);
      Swal.fire({
        title: '已成功註冊',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
        position: 'top',
      });
      navigate('/todos');
      return;
    } else {
      Swal.fire({
        title: '註冊失敗',
        icon: 'error',
        text: message,
        confirmButtonText: '確認',
        position: 'top',
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          type="text"
          placeholder="請輸入要註冊的帳號"
          value={username}
          onChange={(InputUserName) => setUserName(InputUserName)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="信箱"
          type="email"
          placeholder="請輸入要註冊的信箱"
          value={email}
          onChange={(InputUserEmail) => setUserEmail(InputUserEmail)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          type="password"
          placeholder="請輸入要註冊的密碼"
          value={password}
          onChange={(InputUserPassword) => setUserPassword(InputUserPassword)}
        />
      </AuthInputContainer>

      <AuthButton onClick={handleRegisterClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
