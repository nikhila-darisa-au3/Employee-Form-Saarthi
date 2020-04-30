import React from 'react';
const Modal = ({show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-section">
          {children}
        </section>
      </div>
    );
  };

  export default Modal