import '../Header/Header.css';
import { Link } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <div>
      <Link to={'/register'} className="link-reg-log">
        Регистрация
      </Link>
      <Link to={'/login'} className="link-reg-log">
        Войти
      </Link>
    </div>
  );
};

export default AnonymousMenu;
