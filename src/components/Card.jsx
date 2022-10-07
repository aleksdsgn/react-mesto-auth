import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  // подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `'card__button-delete' ${!isOwn ? 'card__button-delete_hidden' : 'card__button-delete'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `card__button-like ${isLiked ? 'card__button-like_active' : ''}`
  );

  // обработчик клика по изображению карточки
  function handleCardClick() {
    onCardClick(card);
  }

  // обработчик клика кнопки like
  function handleLikeClick() {
    onCardLike(card);
  }

  // обработчик клика кнопки delete
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <button
        onClick={() => handleDeleteClick()}
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить"
      />
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => handleCardClick()}
        role="presentation"
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            onClick={() => handleLikeClick()}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
          />
          <p className="card__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
