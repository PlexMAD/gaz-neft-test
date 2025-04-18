import React from 'react';
import { useAppSelector } from '../store/store';
import { getWorstStatus } from '../utils/getWorstStatus';

const ServiceStatusInfo = () => {
  const groups = useAppSelector((state) =>
    state.groups
  );
  const allNodes = Object.values(groups.entities).flatMap((group) => group.nodes)

  const { status, color } = getWorstStatus(allNodes);

  return (
    <div>
      <h3>Общая информация о статусе сервиса:</h3>
      <p>{status?.description ?? 'Нет данных'}</p>
      <div style={{ width: 50, height: 50, backgroundColor: color }} />
    </div>
  );
};

export default ServiceStatusInfo;
