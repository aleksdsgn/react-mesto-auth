function Register() {
  return (
    <section className="sign">
      <form
        className="sign__form"
        name="register"
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
          <span className="sign__link">
            Войти
          </span>
        </p>
      </form>
    </section>
  );
}

export default Register;
