import React from "react";
import styles from "./button.module.scss";

interface IButtonProps {
  onClick: () => void;
  title: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<IButtonProps> = ({
  onClick,
  title,
  isLoading = false,
}) => {
  return (
    <React.Fragment>
      <button
        disabled={isLoading}
        className={styles["CustomButton"]}
        onClick={onClick}
      >
        {title}
      </button>
    </React.Fragment>
  );
};

export default CustomButton;
