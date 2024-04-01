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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    pointerEvents: 'none',
    color: 'whitesmoke'
  },
  
  popup: {
    backgroundColor: 'rgba(50, 50, 50, 0.5)', /* Зеленый цвет фона */
    width: '50%',
    minWidth: '300px',
    border: '2px solid white', /* Бордер зеленого цвета */
    borderRadius: '8px',
    transition: 'all 1s',
    boxShadow: '0px 3px 10px 2px white, inset 0 -2px 5px 1px'
  },
  
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },
  
  popupTitle: {
    fontSize: '1.2em',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'normal',
  },
  
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5em',
    cursor: 'pointer',
    color: 'white', /* Цвет крестика */
    pointerEvents: 'auto',
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
          <div style={{ ...styles.popup, transform: stage == 'enter' ? 'translateY(80px)' : 'translateY(-200px)' }}>
            <div style={styles.popupHeader}>
              <span style={styles.popupTitle}>Итоговый проект: Ибрагим Зинатуллин</span>
              <button style={styles.closeBtn} onClick={handleClose}>
                &times;
              </button>
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
