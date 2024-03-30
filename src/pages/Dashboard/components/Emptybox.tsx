import { useAppSelector } from "../../../store/store";

function EmptyBox() {
  const { tab } = useAppSelector((state) => state.general);
  return (
    <div className="flex flex-row w-full h-full items-center justify-center text-link text-4xl">
      Select a {` ${tab} `}
    </div>
  );
}

export { EmptyBox };
