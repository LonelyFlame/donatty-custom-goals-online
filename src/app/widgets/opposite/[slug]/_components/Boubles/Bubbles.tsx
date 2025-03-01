import Bubble from './Bubble';

const Bubbles = () => {
  return Array.from({ length: 50 }).map((_, index) => <Bubble key={index} />);
};

export default Bubbles;
