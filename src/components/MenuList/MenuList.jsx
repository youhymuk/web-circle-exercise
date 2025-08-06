import styles from './MenuList.module.css';
import MenuItem from '../MenuItem/MenuItem';

const MenuList = ({ dishes }) => (
  <div className={styles.restaurantWrapper}>
    <div className={styles.menu}>
      {dishes.length > 0 ? dishes.map((dish) => <MenuItem dish={dish} key={dish.idMeal} />) : <p>No dishes found :(</p>}
    </div>
  </div>
);

export default MenuList;
