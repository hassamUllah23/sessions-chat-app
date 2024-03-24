import { PropsWithChildren } from "react";

type Props = {
  // title: string; open: boolean; onClose: () => void
};

function Modal({ children }: Props & PropsWithChildren) {
  return (
    <div
      id="hs-modal"
      className="hs-overlay bg-card hidden size-full fixed top-0 start-0 !z-[100] overflow-x-hidden overflow-y-auto"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
        <div className="w-full max-h-full overflow-hidden flex flex-col bg-background border shadow-sm rounded-xl">
          <div className="flex justify-between items-center py-3 px-4 border-b ">
            <h3 className="font-bold text-text">Modal title</h3>
            <button
              type="button"
              className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent  disabled:pointer-events-none"
              data-hs-overlay="#hs-modal"
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export { Modal };
