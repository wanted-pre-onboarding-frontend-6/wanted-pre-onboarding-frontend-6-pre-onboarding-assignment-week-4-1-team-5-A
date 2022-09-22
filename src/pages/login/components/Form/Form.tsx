import { useMutation } from '@tanstack/react-query';
import UserApi from 'apis/user/userApi';
import useInputs from 'hooks/useInputs';
import { useNavigate } from 'react-router-dom';
import TokenService from 'services/TokenService';
import * as Styled from './Style';

interface Form {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [{ email, password }, onChangeForm] = useInputs<Form>({
    email: '',
    password: '',
  });

  const LoginUser = useMutation((data: any) => UserApi.loginUser(data), {
    onSuccess: (response: any) => {
      const { accessToken } = response.data;
      TokenService.setToken({ key: process.env.REACT_APP_TOKEN_KEY as string, token: accessToken });
      if (TokenService.getToken(process.env.REACT_APP_TOKEN_KEY as string)) {
        navigate('/accounts/account-list', { replace: true });
      }
    },
    onError: () => {
      alert('아이디와 비밀번호를 한번 더 확인해주세요');
    },
  });

  const onLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    LoginUser.mutate({
      data: { email, password },
    });
  };

  return (
    <Styled.Form onSubmit={onLoginSubmit}>
      <h1>로그인</h1>
      <Styled.Container>
        <span>아이디</span>
        <input
          type="text"
          name="email"
          placeholder="아이디를 입력하세요"
          autoComplete="off"
          onChange={onChangeForm}
        />
      </Styled.Container>
      <Styled.Container>
        <span>비밀번호</span>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="off"
          onChange={onChangeForm}
        />
      </Styled.Container>
      <button>LOGIN</button>
    </Styled.Form>
  );
};
export default LoginForm;
