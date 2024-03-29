import { PropsWithChildren, useEffect } from "react";
import { Spinner } from "./Spinner";

type Props = {
  loading: boolean;
  data: any;
  dirty: boolean;
};

function SearchResults({
  loading,
  dirty,
  data,
  children,
}: Props & PropsWithChildren) {
  useEffect(() => {}, [loading]);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : data ? (
        children
      ) : dirty ? (
        <p className="text-error text-sm">No records found!</p>
      ) : null}
    </div>
  );
}

export { SearchResults };
