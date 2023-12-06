import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from 'api/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.length === 0 || password.length === 0) {
      return Swal.fire({
        title: '錯誤',
        text: '請勿在帳號或密碼欄位中輸入空值',
        icon: 'error',
        confirmButtonText: '確認',
      });
    }
    const { success, authToken } = await login({ username, password });

    if (success) {
      localStorage.setItem('authToken', authToken);
      Swal.fire({
        title: '已成功登入',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
        position: 'top'
      });
      navigate('/todos')
      return;
    } else {
      Swal.fire({
        title: '登入失敗',
        icon: 'error',
        text: '帳號或是密碼錯誤',
        confirmButtonText: '確認',
        position: 'top',
      });
    }
  };
  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          type="text"
          value={username}
          placeholder="請輸入帳號"
          onChange={(nameInputValue) => setUsername(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleLogin}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
