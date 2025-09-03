import { useTranslation } from 'react-i18next';

const AuditInfoCard = (auditInfo: {
  author: string;
  createdAt: string;
  updatedBy?: string;
  lastUpdatedAt?: string;
}) => {
  const { t } = useTranslation('components');

  const auditFields: Record<string, { label: string; value: string }> = {
    author: {
      label: t('auditInfo.author'),
      value: auditInfo.author,
    },
    createdAt: {
      label: t('auditInfo.createdAt'),
      value: auditInfo.createdAt,
    },
    ...(auditInfo.updatedBy && {
      updatedBy: {
        label: t('auditInfo.updatedBy'),
        value: auditInfo.updatedBy,
      },
    }),
    ...(auditInfo.lastUpdatedAt && {
      lastUpdatedAt: {
        label: t('auditInfo.lastUpdatedAt'),
        value: auditInfo.lastUpdatedAt,
      },
    }),
  };

  return (
    <div className="">
      {Object.values(auditFields).map((entry, index) => (
        <div
          key={entry.value + index}
          className="flex gap-2 mb-2 text-[15px] text-rhino-grey text-nowrap"
        >
          <h5>{entry.label}:</h5>
          <h5>{entry.value}</h5>
        </div>
      ))}
    </div>
  );
};

export default AuditInfoCard;
