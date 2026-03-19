import { useEffect } from "react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseStyle =
    "fixed top-5 right-5 px-4 py-3 rounded-xl shadow-lg text-white transition-all";

  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type]}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;