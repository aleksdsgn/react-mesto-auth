import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  buttonText,
}) {
  const [namePlace, setNamePlace] = useState('');
  const [linkPlace, setLinkPlace] = useState('');

  // Обработчик изменения значения в инпуте названия места
  const handleChangeNamePlace = (e) => {
    setNamePlace(e.target.value);
  };

  // Обработчик изменения значения в ссылке на картинку
  const handleChangeLinkPlace = (e) => {
    setLinkPlace(e.target.value);
  };

  // Обработчик сабмита
  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(namePlace, linkPlace);
  };

  useEffect(() => {
    // Очистка полей ввода
    setNamePlace('');
    setLinkPlace('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label htmlFor="title-input" className="popup__field">
          <input
            name="name"
            className="popup__input popup__input_type_title"
            type="text"
            placeholder="Название"
            required=""
            minLength={2}
            maxLength={30}
            id="title-input"
            value={namePlace}
            onChange={handleChangeNamePlace}
          />
          <span className="popup__error popup__error_visible title-input-error" />
        </label>
        <label htmlFor="link-input" className="popup__field">
          <input
            name="link"
            className="popup__input popup__input_type_link"
            type="url"
            placeholder="Ссылка на картинку"
            required=""
            id="link-input"
            value={linkPlace}
            onChange={handleChangeLinkPlace}
          />
          <span className="popup__error popup__error_visible link-input-error" />
        </label>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
