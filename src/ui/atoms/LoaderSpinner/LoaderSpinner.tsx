// Styles
import "./loader-spinner.scss";

interface LoaderSpinnerProps {
  size: number;
}

export const LoaderSpinner = ({ size }: LoaderSpinnerProps) => {
  return (
    <div
      className={`
        a-loaderSpinner
      `}
      style={{ width: size, height: size }}
    ></div>
  );
};
