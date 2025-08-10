import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedList = localStorage.getItem("wishlist");
    setWishlist(storedList ? JSON.parse(storedList) : []);
  }, []);

  const toggleFavoriteDish = useCallback((dish) => {
    setWishlist((prev) => {
      const isDishFavorite = prev?.some((item) => item.idMeal === dish.idMeal);
      let updated;
      if (isDishFavorite) {
        updated = prev?.filter((item) => item.idMeal !== dish.idMeal);
      } else {
        updated = [...prev, dish];
      }
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleFavoriteDish }}>
      {children}
    </WishlistContext.Provider>
  );
};
