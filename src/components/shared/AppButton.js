import React from "react";

function AppButton({ disabled, children, onClick, type, className }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`inline-flex w-full mx-2 px-4 items-center py-2 uppercase my-1 border border-transparent text-base font-medium rounded-full text-white bg-orange-500 hover:bg-orange-700 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
}
AppButton.defaultProps = {
  Disabled: false,
  type: "button",
};
export default AppButton;
