import type { FVTTSocketCallbacks } from './types/callbacks';
import type { TFVTTInitialData } from './types/initial';
import type { TFVTTAction } from './types/actions';

import { init } from './socket';
import { parseRolls } from './utils';
import { LIVE_CHECK_INTERVAL, LIVE_CHECK_TOLERANCE } from './constants';

class FVTTSocket {
  private socket: WebSocket | null = null;

  private ping: Date = new Date();
  private liveCheckTimeout: ReturnType<typeof setTimeout> | null = null;

  private readonly host: string;
  private readonly session: string;

  private readonly callbacks?: FVTTSocketCallbacks;

  constructor(
    host: string,
    session: string,
    callbacks?: FVTTSocketCallbacks
  ) {
    this.host = host;
    this.session = session;
    this.callbacks = callbacks;

    this.init();
  };

  private readonly init = () => {
    const socket = init(this.host, this.session);

    socket.addEventListener('message', (event) => {
      const { data: eventData } = event;

      const [id] = eventData.match(/^\d*/);
      const message = eventData.replace(/^\d*/, '');

      switch (id) {
        case '0': { // connection init
          socket.send('40');
          setTimeout(() => {
            socket.send(`420${JSON.stringify(['world'])}`);
          }, 100);
          setTimeout(() => {
            socket.send(`421${JSON.stringify(['time'])}`);
          }, 200);

          break;
        }
        case '2': { // ping
          this.pinged();
          break;
        }
        case '40': { // sid
          break;
        }
        case '42': { // session, userActivity, modifyDocument
          const data: TFVTTAction = JSON.parse(message);

          if (this.callbacks?.onAction) {
            this.callbacks.onAction(data);
          }

          if (data[0] === 'modifyDocument') {
            data[1].request.data?.forEach(({ rolls, user, speaker, flags }) => {
              const actionActorId = speaker?.actor;

              rolls?.map((rollData) => {
                const roll = parseRolls(rollData);

                if (this.callbacks?.onRoll && roll) {
                  this.callbacks.onRoll(roll, flags, actionActorId, user);
                }
              })
            });
          }

          break;
        }
        case '430': { // initial data
          const [data]: [TFVTTInitialData] = JSON.parse(message);

          if (this.callbacks?.onInit) {
            this.callbacks.onInit(data);
          }

          break;
        }
        case '431': { // time data
          break;
        }
        default: {
          const data = JSON.parse(message);

          if (this.callbacks?.onOther) {
            this.callbacks.onOther(id, data);
          }
        }
      }
    });

    socket.onerror = (error) => {
      console.error(`[FVTT:] Socket error:`, error);

      this.clearLiveCheckTimeout();

      window.setTimeout(() => {
        this.reInit();
      }, 5000);
    }

    this.socket = socket;

    this.ping = new Date();

    this.scheduleLiveCheck();
  };

  private readonly reInit = () => {
    this.socket?.close();

    console.error(`[FVTT:] Reconection...`);

    this.init();
  };

  private readonly pinged = () => {
    this.ping = new Date();

    this.socket?.send('3'); // pong
  };

  private readonly scheduleLiveCheck = () => {
    this.clearLiveCheckTimeout();

    this.liveCheckTimeout = setTimeout(() => {
      const isAlive = this.liveCheck();

      if (isAlive) {
        this.scheduleLiveCheck();
      } else {
        this.reInit();
      }

    }, LIVE_CHECK_INTERVAL);
  };

  private readonly liveCheck = () => {
    const now = new Date();
    const lastPing = this.ping;
    const diff = now.getTime() - lastPing.getTime();

    return diff > LIVE_CHECK_TOLERANCE;
  };

  private readonly clearLiveCheckTimeout = () => {
    if (!this.liveCheckTimeout) {
      return;
    }

    clearTimeout(this.liveCheckTimeout);
    this.liveCheckTimeout = null;
  };

  public readonly close = () => {
    this.socket?.close();
  };
}

export default FVTTSocket;
