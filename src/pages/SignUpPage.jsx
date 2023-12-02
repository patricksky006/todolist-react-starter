import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignUpPage = () => {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

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
          value={userName}
          onChange={(InputUserName) => setUserName(InputUserName)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="信箱"
          type="email"
          placeholder="請輸入要註冊的信箱"
          value={userEmail}
          onChange={(InputUserEmail) => setUserEmail(InputUserEmail)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          type="password"
          placeholder="請輸入要註冊的密碼"
          value={userPassword}
          onChange={(InputUserPassword) => setUserPassword(InputUserPassword)}
        />
      </AuthInputContainer>

      <AuthButton>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
