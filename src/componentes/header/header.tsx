import { useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
export function Header({ className }: { className?: string }) {
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');

  const onLogOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleNavigateToMyPost = () => {
    navigate('/myposts');
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateCreate = () => {
    navigate('/create');
  };

  const handleNavigateLogin = () => {
    navigate('/login');
  };

  return (
    <header className={className} data-testid="header">
      <div className={styles.imgContainer}>
        <img
          src="/iconoMaku.png"
          className={styles.imgHeader}
          alt="logo pagáina Maku"
          onClick={handleNavigateHome}
        />
        {userName && <span className={styles.helloName}>Hola {userName}</span>}
      </div>
      <div className={styles.buttonContainer} id="mainButtons">
        <button data-testid="button-ultimos-post" onClick={handleNavigateHome}>
          Últimos Post
        </button>
        {userName && (
          <button
            data-testid="button-mis-post"
            onClick={handleNavigateToMyPost}
          >
            Mis Post
          </button>
        )}
        {userName && (
          <button
            data-testid="button-crear-posts"
            onClick={handleNavigateCreate}
          >
            Crear Posts
          </button>
        )}
        {userName ? (
          <button data-testid="button-logOut" onClick={onLogOut}>
            Logout
          </button>
        ) : (
          <button data-testid="button-login" onClick={handleNavigateLogin}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}
