function InfoTooltip({
  isOpen,
  onClose,
  message,
}) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__form popup__form_type_info-tooltip">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          className="popup__image-tooltip"
          src={message.image}
          alt={message.text}
        />
        <h3 className="popup__title popup__title-message">
          {message.text}
        </h3>
      </div>
    </section>
  );
}

export default InfoTooltip;
