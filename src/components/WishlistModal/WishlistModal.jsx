import Button from "../Button/Button";
import { useWishlist } from "../../contexts/WishlistContext.jsx";

import styles from "./WishlistModal.module.css";

const WishlistModal = ({ onClose }) => {
  const { wishlist, toggleFavoriteDish } = useWishlist();

  const handleRemoveDish = (dish) => () => {
    toggleFavoriteDish(dish);
  };

  return (
    <article className={styles.modal}>
      <Button
        className={styles.closeBtn}
        onClick={onClose}
        title="Close the modal"
      >
        X
      </Button>
      <h2>Meals you like:</h2>
      {wishlist?.length ? (
        <ul className={styles.wishlistItems}>
          {wishlist.map((dish) => (
            <li key={dish.idMeal} className={styles.wishlistItem}>
              <img src={dish.strMealThumb} alt={`${dish.strMeal} thumbnail`} />
              <h3>{dish.strMeal}</h3>
              <Button
                className={styles.removeBtn}
                onClick={handleRemoveDish(dish)}
                title="Remove dish from the wishlist"
              >
                X
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        "Empty State"
      )}
    </article>
  );
};

export default WishlistModal;
