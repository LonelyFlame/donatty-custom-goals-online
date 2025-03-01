import DConnection from './DConnextion';
import DSse from './DSse';
import { OriginError, TokensError } from './errors';
import { BASE_URI } from './constants';
import { TDEventMessageData, TDEventMessageProps } from './types/messages';
import type { TDWidgetsResponse } from './types/response';
import { TDWidgetType } from './types/widget';


class DWidget<Response extends TDWidgetsResponse = TDWidgetsResponse, MessageData extends any = undefined> {
  protected readonly sse: DSse<Response, MessageData>;

  protected readonly connection: DConnection<Response>;

  constructor(link: string) {
    const url = new URL(link);

    if (url.origin !== BASE_URI) {
      throw new OriginError(url.origin);
    }

    const ref = url.searchParams.get('ref');
    const token = url.searchParams.get('token');
    if (!token || !ref) {
      throw new TokensError();
    }

    this.connection = new DConnection<Response>(ref, token);
    this.sse = new DSse<Response, MessageData>(ref, this.connection);
    this.sse.onMessage = ((message: TDEventMessageProps<Response> | TDEventMessageData<MessageData>) => {
      this.handleMessage(message);
    });
  }

  private readonly handleMessage = (message: TDEventMessageProps<Response> | TDEventMessageData<MessageData>) => {
    const data = this.processMessage(message);

    this.onData(data);
  }

  protected processMessage(message: TDEventMessageProps<Response> | TDEventMessageData<MessageData>): unknown {
    return message;
  }

  protected verifyWidgetType(_type: TDWidgetType): boolean {
    return true;
  }

  public readonly start = async () => {
    const { props, type } = await this.connection.fetchData();

    this.verifyWidgetType(type);

    const message:TDEventMessageProps<Response> = {
      action: 'INIT',
      data: { props },
    }

    this.handleMessage(message);

    this.sse.start();
  }

  public readonly stop = async () => {
    this.sse.stop();
    this.connection.stop();
  }

  public onData(message: ReturnType<typeof this.processMessage>) {
    console.log(message); // eslint-disable-line no-console
  }
}

export default DWidget;
