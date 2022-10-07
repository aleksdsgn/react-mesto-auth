import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <button
          onClick={onEditAvatar}
          className="profile__button profile__button_type_edit-profile-avatar"
          type="button"
          aria-label="Редактировать аватар"
        >
          <img
            src={currentUser.avatar}
            alt="Аватар профиля"
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
        </button>
        <div className="profile__info">
          <div className="profile__title-with-button">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__button profile__button_type_edit-profile-info"
              type="button"
              aria-label="Редактировать профиль"
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__button profile__button_type_add-card"
          type="button"
          aria-label="Добавить новое место"
        />
      </section>
      {/* контейнер для шаблонов карточек */}
      <section className="places">
        <ul className="places__container">
          {cards.map((card) => (
            <li key={(card._id)} className="places__element">
              <Card
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
