/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const RegisterSuccessComponent = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-blue-600 flex">
            <div className="font-black text-4xl text-green-600">REGISTRATION SUCCESSFUL</div>
            <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-md">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterSuccessComponent;

