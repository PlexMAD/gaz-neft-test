import React, { FC } from 'react';
import { useAppSelector } from '../store/store';
import useNodesById from '../hooks/useNodesById';
import { getWorstStatus } from '../utils/getWorstStatus';

const GroupStatusInfo: FC = () => {
  const selectedGroupId = useAppSelector((state) => state.groups.selectedGroupId);
  const nodes = useNodesById(selectedGroupId);
  const { status, color } = getWorstStatus(nodes);

  return (
    <div>
      <h3>Статус выбранной группы:</h3>
      <p>{status?.description ?? 'Нет данных'}</p>
      <div style={{ width: 50, height: 50, backgroundColor: color }} />
    </div>
  );
};

export default GroupStatusInfo;
