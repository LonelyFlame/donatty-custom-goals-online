import { useState, useEffect } from 'react';

import { CRProjectSync } from '../CRProject';

export const useProjectSync = (id: number, initialValue: number) => {
  const [value, setValue] = useState<number>(initialValue || 0);

  useEffect(() => {
    CRProjectSync(id, setValue);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return value;
};
