import { init } from './socket';
import { parseRolls } from './utils';
import type { FVTTSocketCallbacks } from './types/callbacks';
import type { TFVTTInitialData } from './types/initial';
import type { TFVTTAction } from './types/actions';

const FVTTSocket = (host: string, session: string, callbacks?: FVTTSocketCallbacks): WebSocket => {
  const socket = init(host, session);

  socket.addEventListener('message', (event) => {
    const { data: eventData } = event;

    const [id] = eventData.match(/^\d*/);
    const message = eventData.replace(/^\d*/, '');

    switch (id) {
      case '0': { // connection init
        socket.send('40');
        socket.send(`420${JSON.stringify(['world'])}`);
        socket.send(`421${JSON.stringify(['time'])}`);

        break;
      }
      case '2': { // ping
        socket.send('3'); // pong
        break;
      }
      case '40': { // sid
        break;
      }
      case '42': { // session, userActivity, modifyDocument
        const data: TFVTTAction = JSON.parse(message);

        if (callbacks?.onAction) {
          callbacks.onAction(data);
        }

        if (data[0] === 'modifyDocument') {
          data[1].request.data?.forEach(({ rolls, user, speaker, flags }) => {
            const actionActorId = speaker?.actor;

            rolls?.map((rollData) => {
              const roll = parseRolls(rollData);

              if (callbacks?.onRoll && roll) {
                callbacks.onRoll(roll, flags, actionActorId, user);
              }
            })
          });
        }

        break;
      }
      case '430': { // initial data
        const [data]: [TFVTTInitialData] = JSON.parse(message);

        if (callbacks?.onInit) {
          callbacks.onInit(data);
        }

        break;
      }
      case '431': { // time data
        break;
      }
      default: {
        const data = JSON.parse(message);

        if (callbacks?.onOther) {
          callbacks.onOther(id, data);
        }
      }
    }
  });

  return socket;
};

export default FVTTSocket;
