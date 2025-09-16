import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import NavBar from "../components/NavBar/NavBar.jsx";
import SearchField from "../components/SearchField/SearchField.jsx";
import MenuList from "../components/MenuList/MenuList.jsx";
import { getQueryParam } from "../utils/qsUtils.js";
import LikeButton from "../components/LikeButton/LikeButton.jsx";
import WishlistModal from "../components/WishlistModal/WishlistModal.jsx";
import { WishlistProvider } from "../contexts/WishlistContext";
import styles from "./RestaurantView.module.css";

const RestaurantView = () => {
  const qsSearch = getQueryParam("search")?.toString() || "";

  const [searchValue, setSearchValue] = useState(qsSearch);
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlistOpened, setIsWishlistOpened] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlistOpened((isWishlistOpened) => !isWishlistOpened);
  };

  // useDebouncedCallback takes a function as a parameter and as the second parameter
  // the number of milliseconds it should wait until it is actually called so a user
  // can type freely and as long as they are typing a letter quicker than 500ms, the function won't fire yet.
  // This is to optimize user experience and communication with the server
  const debouncedEffectHook = useDebouncedCallback(() => {
    let currentEffect = true;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${qsSearch}`)
      .then((res) => {
        if (!res.ok) {
          return { meals: null };
        }
        return res.json();
      })
      .then((result) => {
        if (!currentEffect) {
          return;
        }
        // The ?? operator turns 'undefined' or 'null' values into a preferred default value on the right side
        // We know that result.meals can be null if there are no results, so in that case, we provide an empty array for safety
        setDishes(result.meals ?? []);
      })
      .catch(() => {
        if (!currentEffect) {
          return;
        }
        setDishes([]);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // This cleanup function is to prevent multiple API calls coming back out of sequence and setting the value of our dishes list.
    // Example:
    // 1. First search query is pizza -> Network request takes 5 seconds to fetch data
    // 2. In the meantime, the user types burger instead -> Network request takes 1 second and shows burgers in the list
    // 3. Then, finally, the first data fetch comes back and overwrites the results, so the search box shows 'burger'
    //    but the results show pizzas. This is called "stale data"
    return () => {
      currentEffect = false;
    };
  }, 500);

  // useEffect can take a variable that is a function and does not need to be defined as an anonymous () => {} arrow function
  // This is especially important when using more controlled techniques like debouncing
  useEffect(debouncedEffectHook, [debouncedEffectHook, qsSearch]);

  return (
    <>
      <NavBar>
        <h1>ReDI React Restaurant</h1>
        <SearchField
          disabled={isLoading}
          value={searchValue}
          onSetValue={setSearchValue}
        />
        <LikeButton onClick={handleWishlistToggle} />
      </NavBar>
      <WishlistProvider>
        {isLoading ? (
          <h2 className={styles.loading}>Loading...⏳</h2>
        ) : (
          <MenuList dishes={dishes} />
        )}
        {isWishlistOpened && <WishlistModal onClose={handleWishlistToggle} />}
      </WishlistProvider>
    </>
  );
};

export default RestaurantView;
