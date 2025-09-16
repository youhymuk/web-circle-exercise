import styles from "./Button.module.css";

const Button = ({ className, isSelected, title, name, onClick, children }) => {
  const buttonStyles = [styles.button, className].filter(Boolean);

  if (isSelected) {
    buttonStyles.push(styles.selected);
  }

  return (
    <button
      className={buttonStyles.join(" ")}
      title={title}
      onClick={() => onClick(name)}
    >
      {children}
    </button>
  );
};

export default Button;
