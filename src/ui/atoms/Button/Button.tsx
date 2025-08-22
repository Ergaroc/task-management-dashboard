// Styles
import "./button.scss";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "blue" | "white" | "red";
  leftIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  onClick,
  children,
  type = "button",
  variant = "blue",
  leftIcon,
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`a-button a-button--${variant} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {leftIcon && <span className="a-button__icon">{leftIcon}</span>}
      {children}
    </button>
  );
};
