import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterData } from '../../models/user';
import { useUsers } from '../hooks/useUsers';
import style from './register.module.scss';
export default function Register() {
  const navigate = useNavigate();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const { handleRegisterUser } = useUsers();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const registerForm = event.target as HTMLFormElement;
    const data: RegisterData = {
      userName: (
        registerForm.elements.namedItem('userName') as HTMLInputElement
      ).value,
      password: (
        registerForm.elements.namedItem('password') as HTMLInputElement
      ).value,
      email: (registerForm.elements.namedItem('email') as HTMLInputElement)
        .value,
      posts: [],
    };

    handleRegisterUser(data);

    navigate('/login');
  };

  return (
    <>
      <h1>Registrate aquí</h1>
      <img src="/escaladorRegistro.gif" alt="gif login" />
      <form
        role="form"
        aria-label="form"
        className={style.formRegister}
        onSubmit={handleSubmit}
      >
        <label htmlFor="userName">Nick</label>
        <input
          name="userName"
          type="text"
          id="userName"
          data-testid="input-username"
        />
        <label htmlFor="contraseña">Nueva contraseña</label>
        <input
          name="contraseña"
          id="password"
          type={isPasswordVisible ? 'text' : 'password'}
          data-testid="input-password"
        />
        <label htmlFor="email">e-mail</label>
        <input name="email" type="email" id="email" data-testid="input-email" />
        <button
          className={style.buttonRegister}
          type="submit"
          data-testid="button-register"
        >
          Registrar
        </button>
      </form>
      <button
        className={style.buttonShowPassword}
        data-testid="button-visibility"
        onClick={() => setPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? 'Ocultar' : 'Mostrar'} contraseña
      </button>
    </>
  );
}
