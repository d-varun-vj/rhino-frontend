import { Group, Text, rem } from '@mantine/core';

import { modals } from '@mantine/modals';
import { CgDanger } from 'react-icons/cg';

interface ConfirmationModalProps {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const openDeleteConfirmationModal = ({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  modals.openConfirmModal({
    withCloseButton: false,
    centered: true,
    size: 'lg',
    title: (
      <Group gap="xs" align="center">
        <CgDanger size={28} color="#e03131" style={{ flexShrink: 0 }} />
        <Text fw={700} size="lg" c="red.9">
          {title || 'Confirmation'}
        </Text>
      </Group>
    ),
    children: <Text size="md">{message}</Text>,
    labels: {
      confirm: confirmLabel || 'Delete',
      cancel: cancelLabel || 'Cancel',
    },
    confirmProps: { color: 'red.9', size: 'sm', radius: 'md' },
    cancelProps: { variant: 'outline', size: 'sm', radius: 'md' },
    groupProps: { justify: 'right', mt: 'lg', gap: rem(12) },
    onConfirm,
    onCancel,
  });
};

export default openDeleteConfirmationModal;
