import DWidget from './DWidget';
import { TypeError } from './errors';
import type { TDWidgetsResponseGoal, TDEventMessageDataGoal, TDGoalMessage } from './types/goal';
import type { TDEventMessageData, TDEventMessageProps } from './types/messages';
import type { TDWidgetType } from './types/widget';

class DGoal extends DWidget<TDWidgetsResponseGoal, TDEventMessageDataGoal> {
  private raised: number = 0;
  private goal: number = 0;

  protected verifyWidgetType(type: TDWidgetType) {
    if (type !== 'GOAL') {
      throw new TypeError(type, 'GOAL');
    }

    return true;
  }

  protected processMessage(
    {
      action,
      data,
    }: TDEventMessageProps<TDWidgetsResponseGoal> | TDEventMessageData<TDEventMessageDataGoal>
  ): TDGoalMessage {
    if (action === 'REFRESH' || action === 'INIT') {
      const { props: { data: { goal, goalCollected } } } = data;

      this.raised = goalCollected;
      this.goal = goal;
    }
    if (action === 'DATA') {
      const { raised } = data;

      this.raised = raised;
    }

    return { goal: this.goal, raised: this.raised };
  }

  public onData(data: { goal: number, raised: number }) {
    console.log(data); // eslint-disable-line no-console
  }
}

export default DGoal;
