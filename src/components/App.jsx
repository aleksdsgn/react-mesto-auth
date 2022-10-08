import { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupConfirmDelete from './PopupConfirmDelete';
import Register from './Register';
import Login from './Login';

import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isPopupConfirmDeleteOpen, setIsPopupConfirmDeleteOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [buttonText, setButtonText] = useState('');

  // Запрос карточек и данных профиля через API
  useEffect(() => {
    Promise.all([
      api.getProfileInfo(),
      api.getInitialCards(),
    ])
      .then(([userInfo, cardsData]) => {
        setCurrentUser(userInfo);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsPopupConfirmDeleteOpen(false);
    setSelectedCard({});
  };

  // -------- Обработчики при открытии попапов -------- //

  // Открытие попапа редактирования аватара
  const handleEditAvatar = () => {
    setButtonText('Сохранить');
    setIsEditAvatarPopupOpen(true);
  };

  // Открытие попапа редактирования информации о пользователе
  const handleEditProfile = () => {
    setButtonText('Сохранить');
    setIsEditProfilePopupOpen(true);
  };

  // Открытие попапа добавления новой карточки
  const handleAddPlace = () => {
    setButtonText('Создать');
    setIsAddPlacePopupOpen(true);
  };

  // Открытие попапа с подтверждением удаления карточки
  const handleCardDelete = (card) => {
    setButtonText('Да');
    setSelectedCard(card);
    setIsPopupConfirmDeleteOpen(true);
  };

  // Открытие попапа с увеличенной картинкой
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
  };

  // -------- Обработчики при сабмите -------- //

  // Запись обновленной ссылки на аватар
  const handleUpdateAvatar = (updatedData) => {
    setButtonText('Сохранение...');
    api.editAvatar(updatedData.avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        // уведомить об ошибке в тексте кнопки
        setButtonText(`${err}`);
      })
      .finally(() => {
        // setButtonText('Сохранить');
      });
  };

  // Запись обновленных пользовательских данных
  const handleUpdateUser = (updatedData) => {
    setButtonText('Сохранение...');
    api.updateProfileInfo(updatedData.name, updatedData.about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        // уведомить об ошибке в тексте кнопки
        setButtonText(`${err}`);
      })
      .finally(() => {
        // setButtonText('Сохранить');
      });
  };

  // Создание новой карточки
  const handleAddPlaceSubmit = (name, link) => {
    setButtonText('Сохранение...');
    api.createCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        // уведомить об ошибке в тексте кнопки
        setButtonText(`${err}`);
      })
      .finally(() => {
        // setButtonText('Создать');
      });
  };

  // Удаления карточки
  const handleConfirmDeleteSubmit = () => {
    setButtonText('Удаление...');
    api.deleteCardById(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        // уведомить об ошибке в тексте кнопки
        setButtonText(`${err}`);
      })
      .finally(() => {
        // setButtonText('Да');
      });
  };

  // Обработчик лайка карточки
  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => ((c._id === card._id) ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Login />

        {/* <Main
          onEditAvatar={handleEditAvatar}
          onEditProfile={handleEditProfile}
          onAddPlace={handleAddPlace}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        /> */}

        <Footer />

        {/* форма редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={buttonText}
        />

        {/* форма редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={buttonText}
        />

        {/* форма добавления карточек */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={buttonText}
        />

        {/* попап удаления карточки */}
        <PopupConfirmDelete
          isOpen={isPopupConfirmDeleteOpen}
          onClose={closeAllPopups}
          onConfirm={handleConfirmDeleteSubmit}
          buttonText={buttonText}
        />

        {/* попап открытой карточки */}
        <ImagePopup
          card={selectedCard}
          isOpen={isCardPopupOpen ? 'popup_opened' : ''}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
