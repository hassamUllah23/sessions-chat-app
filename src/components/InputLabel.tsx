type Props = {
  label: string;
};

function InputLabel({ label }: Props) {
  return (
    <div className="block text-start mb-2 text-sm font-medium text-text">
      {label}
    </div>
  );
}

export { InputLabel };
