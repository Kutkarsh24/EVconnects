import React, { useState, useEffect } from 'react';
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiExclamation, HiX } from 'react-icons/hi';

// Types of notifications with their respective styling
const types = {
  success: {
    icon: <HiCheckCircle className="h-6 w-6 text-green-400" aria-hidden="true" />,
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    borderColor: 'border-green-400'
  },
  error: {
    icon: <HiXCircle className="h-6 w-6 text-red-400" aria-hidden="true" />,
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    borderColor: 'border-red-400'
  },
  warning: {
    icon: <HiExclamation className="h-6 w-6 text-yellow-400" aria-hidden="true" />,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-400'
  },
  info: {
    icon: <HiInformationCircle className="h-6 w-6 text-blue-400" aria-hidden="true" />,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-400'
  }
};

const Notification = ({ type = 'info', title, message, isVisible, onClose, autoClose = true, duration = 5000 }) => {
  const [isShown, setIsShown] = useState(isVisible);
  
  // Handle auto close
  useEffect(() => {
    setIsShown(isVisible);
    
    let timer;
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        setIsShown(false);
        if (onClose) onClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, duration, onClose]);
  
  // If not visible, don't render
  if (!isShown) return null;
  
  const { icon, bgColor, textColor, borderColor } = types[type] || types.info;
  
  return (
    <div className="fixed top-4 right-4 max-w-sm z-50">
      <div className={`${bgColor} ${textColor} p-4 rounded-md shadow-md border-l-4 ${borderColor}`}>
        <div className="flex">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-3">
            {title && <h3 className="text-sm font-medium">{title}</h3>}
            {message && <div className="mt-2 text-sm">{message}</div>}
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={() => {
                  setIsShown(false);
                  if (onClose) onClose();
                }}
                className={`inline-flex rounded-md p-1.5 ${textColor} hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600`}
              >
                <span className="sr-only">Dismiss</span>
                <HiX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;