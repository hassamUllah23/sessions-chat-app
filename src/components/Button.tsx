type Props = {
  label: string;
  handleClick: any;
};

function Button({ label, handleClick }: Props) {
  return (
    <button
      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export { Button };
