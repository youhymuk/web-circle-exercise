import Button from "../Button/Button.jsx";

import styles from "./LikeButton.module.css";

const LikeButton = ({ isFavorite, onClick }) => {
  return (
    <Button
      className={styles.menuItemLikeButton}
      isSelected={isFavorite}
      title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
      onClick={onClick}
    >
      {isFavorite ? "❤️" : "🖤"}
    </Button>
  );
};

export default LikeButton;
