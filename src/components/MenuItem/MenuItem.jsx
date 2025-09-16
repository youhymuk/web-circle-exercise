import { Link } from "react-router-dom";

import { useWishlist } from "../../contexts/WishlistContext";
import menuItemStyles from "./MenuItem.module.css";
import LikeButton from "../LikeButton/LikeButton";
import buttonStyles from "../Button/Button.module.css";

const MenuItem = ({ dish }) => {
  const { strMeal: name, strMealThumb: image } = dish;

  const { wishlist, toggleFavoriteDish } = useWishlist();

  const isFavorite = wishlist.some((item) => item.idMeal === dish.idMeal);

  const handleLikeClick = () => {
    toggleFavoriteDish(dish);
  };

  return (
    <div className={menuItemStyles.menuItem}>
      <h3>{name}</h3>
      <LikeButton isFavorite={isFavorite} onClick={handleLikeClick} />
      <img src={image} alt={name} />
      <div className={menuItemStyles.menuItemBtnContainer}>
        <Link className={buttonStyles.button} to={`/meals/${dish.idMeal}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default MenuItem;
