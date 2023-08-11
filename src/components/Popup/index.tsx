import React from 'react';

export const Popup = ({
                        confirmActionClickHandler,
                        setIsPopupOpen,
                        isPopupOpen,
                        text,
                        confirmText,
                        cancelText,
                      }:
                          {
                            confirmActionClickHandler: () => void,
                            setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
                            isPopupOpen: boolean,
                            text: JSX.Element,
                            confirmText: string,
                            cancelText?: string,
                          }) => {
  return (
      <div className='popup'>
        {text}
        <div className='popup__buttons-container'>
          <button onClick={confirmActionClickHandler}>{confirmText}</button>
          {cancelText && <button onClick={() => setIsPopupOpen(!isPopupOpen)}>{cancelText}</button>}
        </div>
      </div>
  );
};
