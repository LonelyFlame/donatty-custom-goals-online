import DConnection from './DConnextion';
import { SSE_ERROR_RECONNECT_INTERVAL, SSE_RECONNECT_INTERVAL } from './constants';
import { MissingError } from './errors';
import type { TDWidgetsResponse } from './types/response';
import { TDEventMessage, TDEventMessageData, TDEventMessageProps } from './types/messages';

class DSse<Response extends TDWidgetsResponse = TDWidgetsResponse, Data extends any = undefined> {
  private readonly ref: string;
  private readonly connection: DConnection<Response>;

  private reconnectionTimeout: ReturnType<typeof setTimeout> | null = null;

  private eventSource: EventSource | null = null;

  constructor(
    ref: string,
    connection: DConnection<Response>,
  ) {
    if (!ref || !connection) {
      throw new MissingError('Both "ref" and "connection"');
    }

    this.ref = ref;
    this.connection = connection;
  }

  private readonly connectToSSE = async (): Promise<void> => {
    this.stop();

    const eventSource = await this.connection.getSSEConnection();

    eventSource.onmessage = (event) => {
      const data = this.parseMessage(event.data);

      if (data.action === 'DATA' || data.action === 'REFRESH') {
        this.onMessage(data);
      }

      if (data.action === 'DELETE') {
        this.stop();
      }
    };

    eventSource.onerror = (e) => {
      console.error('[DSse:] SSE error', e);
      console.error('[DSse:] reconnecting...');

      this.stop();

      this.clearReconnectTimeout();
      setTimeout(() => this.connectToSSE(), SSE_ERROR_RECONNECT_INTERVAL);
    };

    this.eventSource = eventSource;

    this.scheduleReconnect();
  }

  private readonly scheduleReconnect = () => {
    this.clearReconnectTimeout();

    this.reconnectionTimeout = setTimeout(() => {
      this.connectToSSE();
    }, SSE_RECONNECT_INTERVAL);
  }

  private readonly clearReconnectTimeout = () => {
    if (!this.reconnectionTimeout) {
      return;
    }

    clearTimeout(this.reconnectionTimeout);
    this.reconnectionTimeout = null;
  }

  protected parseMessage(message: string): TDEventMessage<Response, Data> {
    return JSON.parse(message) as TDEventMessage<Response, Data>;
  }

  public readonly start = async (): Promise<void> => {
    return this.connectToSSE();
  }

  public readonly stop = () => {
    if (!this.eventSource) return;

    this.eventSource.close();
    this.eventSource = null;
  }

  public onMessage = (message: TDEventMessageProps<Response> | TDEventMessageData<Data>) => {
    console.log(message); // eslint-disable-line no-console
  }
}

export default DSse;
