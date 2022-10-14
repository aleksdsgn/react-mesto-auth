import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { handleRegister } = this.props;
    const { email, password } = this.state;
    handleRegister(email, password);
  }

  render() {
    return (
      <section className="sign">
        <form
          className="sign__form"
          name="register"
          onSubmit={this.handleSubmit}
        >
          <h3 className="sign__title">
            Регистрация
          </h3>
          <label htmlFor="email-input" className="sign__field">
            <input
              name="email"
              className="sign__input sign__input_type_email"
              type="email"
              placeholder="Email"
              required=""
              id="email-input"
              value={this.email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password-input" className="sign__field">
            <input
              name="password"
              className="sign__input sign__input_type_password"
              type="password"
              placeholder="Пароль"
              required=""
              id="password-input"
              value={this.password}
              onChange={this.handleChange}
            />
          </label>
          <button
            className="sign__submit-button"
            type="submit"
            name="submit"
          >
            Зарегистрироваться
          </button>
          <p className="sign__subtitle">
            Уже зарегистрированы?
            <Link to="/sign-in" className="sign__link">
              Войти
            </Link>
          </p>
        </form>
      </section>
    );
  }
}

export default withRouter(Register);
