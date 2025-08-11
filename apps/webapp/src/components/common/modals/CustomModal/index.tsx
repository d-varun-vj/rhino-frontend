import { Modal, ModalProps } from '@mantine/core';
import { ReactElement } from 'react';

const CustomModal = ({
  children,
  ...props
}: { children: ReactElement } & ModalProps) => {
  return (
    <Modal
      size="auto"
      classNames={{
        title: 'modal-title-custom',
        header: 'modal-header-custom',
        content: 'modal-content-custom',
        body: 'modal-body-custom',
      }}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      centered
      {...props}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
