import React, { CSSProperties, useState } from 'react';
import { useTransition } from 'transition-hook';
import dynamic from 'next/dynamic'

const styles: Record<string, CSSProperties> = {
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    pointerEvents: 'none',
    display: 'none',
  },
  
  popup: {
    backgroundColor: 'lightgreen', /* Зеленый цвет фона */
    width: '400px',
    border: '2px solid green', /* Бордер зеленого цвета */
    borderRadius: '8px',
    transition: 'all 1s',
  },
  
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid green', /* Бордер между заголовком и содержимым */
  },
  
  popupTitle: {
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5em',
    cursor: 'pointer',
    color: 'green', /* Цвет крестика */
    pointerEvents: 'auto',
  },
  
  'closeBtn:hover': {
    color: 'darkgreen', /* Цвет крестика при наведении */
  },
  
  popupContent: {
    padding: '0 10px',
    textAlign: 'center'
  },
  
}

const Popup: React.FC = () => {
  const [onOff, setOnOff] = useState(false)
  const {stage, shouldMount} = useTransition(onOff, 1000)
  setTimeout(() => !shouldMount && stage !== 'leave' ? setOnOff(true) : {});
  const handleClose = () => {
    setOnOff(false);
  };

  return (
    <>
      {shouldMount && (
        <div style={styles.popupContainer}>
          <div style={{ ...styles.popup, transform: stage == 'enter' ? 'translateY(60px)' : 'translateY(-200px)' }}>
            <div style={styles.popupHeader}>
              <span style={styles.popupTitle}>Индивидуальный проект</span>
              <button style={styles.closeBtn} onClick={handleClose}>
                &times;
              </button>
            </div>
            <div style={styles.popupContent}>
              {/* Содержимое вашего pop-up окна */}
              <p>Автор проекта: Ибрагим Зинатуллин 11А</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Popup), {
  ssr: false
});
