import { Link, Route, Switch } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ email, handleLogout }) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип Mesto Russia"
        className="header__logo"
      />
      <Switch>
        <Route exact path="/">
          <div className="header__info">
            <p className="header__email">{email}</p>
            <button
              onClick={handleLogout}
              className="header__link header__link_exit"
              type="button"
            >
              Выйти
            </button>
          </div>
        </Route>

        <Route path="/sign-up">
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        </Route>

        <Route path="/sign-in">
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
