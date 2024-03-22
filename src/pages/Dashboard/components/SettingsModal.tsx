import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setOpenSettingsModal } from "../../../store/slices/modal.slice";
import { DarkModeSwitch, Modal } from "../../../components";

type Props = {};

function SettingsModal({}: Props) {
  const dispatch = useAppDispatch();
  const { openSettingsModal } = useAppSelector((state) => state.modal);

  return (
    <div className="w-full">
      <Modal
        title="Settings"
        open={openSettingsModal}
        onClose={() => dispatch(setOpenSettingsModal(false))}
      >
        <div className="w-full bg-card">
          <p className="text-text text-lg">Dark Mode</p>
          <DarkModeSwitch />
        </div>
      </Modal>
    </div>
  );
}

export { SettingsModal };
