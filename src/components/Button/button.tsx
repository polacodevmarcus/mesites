
interface ButtonProps {
  name: string;
  disabled?: boolean;
  icon?: string;
}

export const Button = ({ name, disabled = false, icon }: ButtonProps) => {
  return (
    <button className={`${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'} text-white font-normal py-3 px-6 rounded-lg hover:cursor-pointer transition-colors shadow-lg flex items-center gap-2`} disabled={disabled} type="submit">
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      {name}
    </button>
  )
}
