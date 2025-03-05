import { BUBBLES_COUNT } from '@/constants/widgets';

import Bubble from './Bubble';

const Bubbles = () => {
  return Array.from({ length: BUBBLES_COUNT }).map((_, index) => <Bubble key={index} />);
};

export default Bubbles;
