import { setQueryParam } from '../../utils/qsUtils';

import styles from './SearchField.module.css';

const SearchField = ({ value, onSetValue }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    onSetValue(value);
    setQueryParam('search', value);
  };

  const handleValueReset = () => {
    onSetValue('');
    setQueryParam('search', '', 'delete');
  };

  return (
    <div className={styles.wrapper}>
      <input placeholder="Filter dishes..." type="text" value={value} onChange={handleInputChange} />
      <button type="button" onClick={handleValueReset}>
        X
      </button>
    </div>
  );
};

export default SearchField;
