import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Login extends Component {
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
    const { handleLogin } = this.props;
    const { email, password } = this.state;
    handleLogin(email, password);
  }

  render() {
    return (
      <section className="sign">
        <form
          className="sign__form"
          name="login"
          onSubmit={this.handleSubmit}
        >
          <h3 className="sign__title">
            Вход
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
            Войти
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(Login);
