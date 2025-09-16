import MenuItem from "../MenuItem/MenuItem";
import styles from "./MenuList.module.css";

const MenuList = ({ dishes }) => (
  <div className={styles.restaurantWrapper}>
    <div className={styles.menu}>
      {dishes?.length > 0 ? (
        dishes.map((dish) => <MenuItem key={dish.idMeal} dish={dish} />)
      ) : (
        <p>No dishes found :(</p>
      )}
    </div>
  </div>
);

export default MenuList;
