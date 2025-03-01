import cn from 'classnames';

import { getData } from './utils';
import Opposite from './_components/Opposite';
import Bubbles from './_components/Boubles';
import styles from './WidgetOpposite.module.scss';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetOpposite = async ({ params }: Props) => {
  const { slug } = await params;

  const {
    goal,
    goalSecondary,
    color,
    colorSecondary,
    leverage,
    liquid,
  } = await getData(slug);

  return (
    <div className={cn('container', styles.container)}>
      <Opposite
        goal={goal}
        goalSecondary={goalSecondary}
        color={color}
        colorSecondary={colorSecondary}
        leverage={leverage}
        liquid={liquid}
      >
        {liquid && <Bubbles />}
      </Opposite>
    </div>
  )
};

export default WidgetOpposite;
