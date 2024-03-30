import { CiMenuKebab } from "react-icons/ci";
import { useAppSelector } from "../../../../store/store";

type Props = {
  title: string;
  hidden: boolean;
  isGroup: boolean;
};
function Header({ title, hidden, isGroup }: Props) {
  const { currentConversation } = useAppSelector((state) => state.conversation);
  return (
    <div
      className={`w-full bg-card flex flex-row justify-between items-center px-5 py-3 ${hidden ? "hidden" : ""}`}
    >
      <div className="flex flex-row gap-1">
        <p className="text-text font-semibold text-lg">{title}</p>
        {currentConversation?.isSession ? (
          <p className="text-link font-semibold text-lg">(Session)</p>
        ) : null}
      </div>
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
