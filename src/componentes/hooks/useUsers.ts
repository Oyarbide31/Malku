import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/config';
import { LoginData } from '../../models/user';
import { loginUserAsync, registerUserAsync } from '../../redux/user.thunks';
import { ApiUsersRepository } from '../../services/api.user.repository';
import { AppDispatch, RootState } from '../../store/store';

export function useUsers() {
  const repo = useMemo(() => new ApiUsersRepository(API_URL), []);
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();

  const handleRegisterUser = async (user: LoginData) => {
    dispatch(registerUserAsync({ repo, user }));
  };

  const handleLoginUser = async (user: LoginData) => {
    dispatch(loginUserAsync({ repo, user, navigate }));
  };

  return {
    handleLoginUser,
    handleRegisterUser,
    user,
  };
}
