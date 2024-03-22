import { DarkModeSwitch } from "../../../components";
import Switch from "@mui/material/Switch";

type Props = {};

function SettingsModal({}: Props) {
  return (
    <div className="w-full">
      <div
        id="settings-modal"
        className="hs-overlay hidden size-full fixed top-0 start-0 !z-[100] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full bg-card overflow-hidden flex flex-col border border-border shadow-sm rounded-xl">
            <div className="flex bg-card justify-between items-center py-3 px-4 border-b border-border ">
              <h3 className="font-bold text-text">Settings</h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent  disabled:pointer-events-none"
                data-hs-overlay="#settings-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4 text-text"
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
            <div className="p-5">
              <div className="bg-card flex flex-row items-center justify-between py-2.5">
                <p className="text-text text-lg">Dark mode</p>
                <DarkModeSwitch />
              </div>
              <div className="bg-card flex flex-row items-center justify-between py-2.5">
                <p className="text-text text-lg">Notifications</p>
                <Switch />
              </div>
              <div className="bg-card py-2.5">
                <div className="hs-accordion-group">
                  <div
                    className="hs-accordion active"
                    id="hs-basic-with-title-and-arrow-stretched-heading-one"
                  >
                    <button
                      className="hs-accordion-toggle py-3 inline-flex items-center justify-between gap-x-3 w-full text-start text-text text-lg rounded-lg disabled:opacity-50 disabled:pointer-events-none d"
                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                    >
                      Blocked users
                      <svg
                        className="hs-accordion-active:hidden block size-4 text-text"
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
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                      <svg
                        className="hs-accordion-active:block hidden size-4"
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
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </button>
                    <div
                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                      aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                    >
                      <p className="text-text">list displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SettingsModal };
