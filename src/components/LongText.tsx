type Props = {
  text: string;
  className?: string;
};

function LongText({ text, className }: Props) {
  return (
    <div className={`w-full text-text ${className}`}>
      {text.split("\n").map((line, index) => (
        <div key={index}>{line == "" ? <br /> : <p key={index}>{line}</p>}</div>
      ))}
    </div>
  );
}

export { LongText };
