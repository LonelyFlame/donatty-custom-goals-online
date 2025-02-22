import Link from 'next/link';

import styles from './Sidebar.module.scss';

interface Props {
  href: string;
  title: string;
}

const Item = ({ href, title }: Props) => {
  return (
    <>
      {title}
      <Link href={href} className={styles.item} />
    </>
  );
}

export default Item;
