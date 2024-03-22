import { PropsWithChildren } from "react";
import { Modal as FlowbiteModal } from "flowbite-react";

type Props = { title: string; open: boolean; onClose: () => void };

function Modal({ title, onClose, open, children }: Props & PropsWithChildren) {
  return (
    <FlowbiteModal className="" show={open} onClose={onClose} dismissible>
      <FlowbiteModal.Header className="bg-card">
        <p className="text-text border-border">{title}</p>
      </FlowbiteModal.Header>
      <FlowbiteModal.Body className="bg-card">{children}</FlowbiteModal.Body>
    </FlowbiteModal>
  );
}

export { Modal };
