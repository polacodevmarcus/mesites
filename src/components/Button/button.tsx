
interface ButtonProps {
  name: string;
  disabled?: boolean;
  icon?: string;
  onClick?: () => void;
  color?: string;
}

export const Button = ({ name, disabled = false, icon, onClick, color = 'bg-primary' }: ButtonProps) => {
  return (
    <button
      className={`${disabled ? 'bg-slate-200 hover:cursor-not-allowed' : `${color} hover:cursor-pointer`}
     text-white font-normal rounded-lg transition-colors shadow-lg flex w-full justify-center items-center px-4 py-4 gap-2`}
      disabled={disabled} type="submit" onClick={onClick}>
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      {name}
    </button>
  );
}
