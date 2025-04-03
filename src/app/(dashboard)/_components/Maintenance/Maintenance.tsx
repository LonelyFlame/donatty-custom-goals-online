import m from 'moment';
import { Alert } from 'antd';
import translations from '@/translations';

import styles from './Maintenance.module.scss';

const { pages: { dashboard: { maintenance: t } } } = translations;

const Maintenance = () => {
  const maintenanceDate = process.env.NEXT_PUBLIC_MAINTENANCE_DATE;
  const date = m(maintenanceDate);
  const isMaintenancePlanned = date.isAfter(m());

  if (!isMaintenancePlanned) return null;

  return (
    <Alert
      type="warning"
      className={styles.alert}
      message={`${t.start} ${date.format('d.mm.yyyy hh:mm ZZ')}. ${t.end}`}
    />
  );
};

export default Maintenance;
