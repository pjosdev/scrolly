import styles from "./scrolly-controls.module.css";

interface ScrollyControlsProps {
  canGoLeft: boolean;
  canGoRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  ButtonLeft?: React.ComponentType<{ onClick: () => void }>;
  ButtonRight?: React.ComponentType<{ onClick: () => void }>;
}

export default function ScrollyControls({
  canGoLeft,
  canGoRight,
  onScrollLeft,
  onScrollRight,
  ButtonLeft,
  ButtonRight,
}: ScrollyControlsProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.btnWrapper} ${styles.btnWrapperLeft} ${
          canGoLeft ? styles.btnWrapperVisible : null
        }`}
      >
        {ButtonLeft ? (
          <ButtonLeft
            onClick={() => {
              console.log("Custom button left clicked, calling onScrollLeft");
              onScrollLeft();
            }}
          />
        ) : (
          <button onClick={onScrollLeft} className={styles.button}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
      </div>
      <div
        className={`${styles.btnWrapper} ${styles.btnWrapperRight} ${
          canGoRight ? styles.btnWrapperVisible : null
        }`}
      >
        {ButtonRight ? (
          <ButtonRight onClick={onScrollRight} />
        ) : (
          <button className={styles.button} onClick={onScrollRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
