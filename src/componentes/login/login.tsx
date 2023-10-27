import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { LoginData } from '../../models/user';
import { useUsers } from '../hooks/useUsers';

import styles from './login.module.scss';

export default function Login() {
  const { handleLoginUser } = useUsers();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const loginFormElement = event?.target as HTMLFormElement;
    const data: LoginData = {
      userName: (
        loginFormElement.elements.namedItem('userName') as HTMLInputElement
      ).value,
      password: (
        loginFormElement.elements.namedItem('pasword') as HTMLInputElement
      ).value,
    };

    handleLoginUser(data);
  };

  return (
    <>
      <h1>¡Bienvenido a Malku!</h1>
      <img
        className={styles.gifLogin}
        src="/escaladorLogin.gif"
        alt="gif login"
      />
      <form
        role="form"
        aria-label="form"
        className={styles.loginForm}
        onSubmit={handleSubmit}
      >
        <label htmlFor="Nick">Nick</label>
        <input type="text" id="userName" />
        <label htmlFor="Password">Password</label>
        <input type="password" id="pasword" />
        <button className={styles.buttonLogin} type="submit">
          Login
        </button>
      </form>
      <span>
        Si no estas registrado, pulsa <Link to="/register">Aqui</Link>
      </span>
    </>
  );
}
