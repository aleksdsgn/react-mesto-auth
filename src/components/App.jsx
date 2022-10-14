import {
  useState,
  useEffect,
} from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
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
import InfoTooltip from './InfoTooltip';
import imageInfoFail from '../images/info-fail.svg';
import imageInfoSuccess from '../images/info-success.svg';
import ProtectedRoute from './ProtectedRoute';

import { api } from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isPopupConfirmDeleteOpen, setIsPopupConfirmDeleteOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [message, setMessage] = useState({
    image: '',
    text: '',
  });
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [buttonText, setButtonText] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();

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
    setIsInfoTooltipPopupOpen(false);
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

  // Обработчик попап с сообщением об успехе или ошибке
  const handleInfoTooltip = () => {
    setIsInfoTooltipPopupOpen(true);
  };

  // Обработчик логина
  const handleLogin = (emailUser, passwordUser) => {
    if (!emailUser || !passwordUser) {
      return;
    }
    auth.authorize(emailUser, passwordUser)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setMessage({
          image: imageInfoFail,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  };

  // Обработчик выхода
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
    setEmail('');
  };

  // Обработчик регистрации
  const handleRegister = (emailUser, passwordUser) => {
    auth.register(emailUser, passwordUser)
      .then(() => {
        setMessage({
          image: imageInfoSuccess,
          text: 'Вы успешно зарегистрировались!',
        });
        history.push('/sign-in');
      })
      .catch((err) => {
        setMessage({
          image: imageInfoFail,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  };

  // Проверка токена в локальном хранилище
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }
  };

  // Проверка наличия токена и залогинен ли пользователь
  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  return (
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>
        <Header handleLogout={handleLogout} email={email} />

        <Switch>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register
              handleRegister={handleRegister}
              message={setMessage}
              onSuccess={handleInfoTooltip}
            />
          </Route>

          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatar}
            onEditProfile={handleEditProfile}
            onAddPlace={handleAddPlace}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

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

        {/* попап сообщения о успехе или ошибке */}
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          message={message}
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
