function PopupWithForm({
  isOpen,
  onClose,
  children,
  buttonText,
  name,
  title,
  onSubmit,
}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form
        className="popup__form"
        name={name}
        noValidate=""
        onSubmit={onSubmit}
      >
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        {children}
        <button
          className="popup__submit-button"
          type="submit"
          name="submit"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
