import React from 'react';
import '../Header/Header.css';
import { Link } from 'react-router-dom';

const AnonymMenu = () => {
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

export default AnonymMenu;
