import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps {
  label: string;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  color = "bg-super-yellow hover:bg-super-yellow/90 focus:ring-super-yellow",
  disabled = false,
  loading = false,
  onClick
}) => {
  return (
    <button
      type="submit"
      className={`uppercase px-5 py-3 text-sm font-medium text-white 
                  rounded-sm transition-colors 
                  ${color} 
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : label}
    </button>
  );
};

export default Button;
