import { CRGetProject } from './CRRequest';
import { SYNC_DELAY } from './constants';

type CRProjectSyncCallback = (_sum: number) => void;
export const CRProjectSync = (id: number, callback: CRProjectSyncCallback) => {
  const sync = async () => {
    const project = await CRGetProject(id);

    callback(project.funded_sum);
  };

  const initTimeout = () => {
    window.setTimeout(() => {
      sync();
      initTimeout();
    }, SYNC_DELAY);
  };
  initTimeout();
};
