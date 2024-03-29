import { CiMenuKebab } from "react-icons/ci";

type Props = {
  title: string;
  hidden: boolean;
  isGroup: boolean;
};
function Header({ title, hidden, isGroup }: Props) {
  return (
    <div
      className={`w-full bg-card flex flex-row justify-between items-center px-5 py-3 ${hidden ? "hidden" : ""}`}
    >
      <p className="text-text font-semibold text-lg">{title}</p>
      <ul className={`${isGroup ? "" : "hidden"}`}>
        <li data-hs-overlay="#group-settings-modal">
          <div className="p-1 bg-card border border-border rounded-full min-w-fit min-h-fit cursor-pointer hover:bg-background">
            <CiMenuKebab className=" text-text" size={14} />
          </div>
        </li>
      </ul>
    </div>
  );
}

export { Header };
