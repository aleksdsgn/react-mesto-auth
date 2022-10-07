import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  buttonText,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // Подстановка в инпуты загруженных данных пользователя из API
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // Обработчик изменения значения в инпуте имени
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  // Обработчик изменения значения в инпуте описания
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  // Обработчик сабмита
  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label htmlFor="name-input" className="popup__field">
          <input
            name="name"
            className="popup__input popup__input_type_name"
            type="text"
            placeholder="Имя"
            required=""
            minLength={2}
            maxLength={40}
            id="name-input"
            value={name || ''}
            onChange={handleChangeName}
          />
          <span className="popup__error popup__error_visible name-input-error" />
        </label>
        <label htmlFor="about-input" className="popup__field">
          <input
            name="about"
            className="popup__input popup__input_type_about"
            type="text"
            placeholder="О себе"
            required=""
            minLength={2}
            maxLength={200}
            id="about-input"
            value={description || ''}
            onChange={handleChangeDescription}
          />
          <span className="popup__error popup__error_visible about-input-error" />
        </label>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
