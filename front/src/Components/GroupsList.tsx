import React, { FC, useMemo } from 'react';
import { GroupId, GroupSelectedAction, useAppDispatch, useAppSelector } from '../store/store';

const GroupsList: FC = () => {
  const { entities } = useAppSelector((state) => state.groups);
  const dispatch = useAppDispatch();
  const selectedGroupId = useAppSelector((state) => state.groups.selectedGroupId)
  const groups = useMemo(() => {
    return Object.values(entities).map((group) => ({
      id: group.group_id,
      name: group.group_name,
    }));
  }, [entities]);
  const isSelected = (id: GroupId) => id === selectedGroupId;
  return (
    <div>
      <p style={{ cursor: 'pointer', color: selectedGroupId ?  undefined :  'violet'}} onClick={() =>
            dispatch({
              type: 'groupSelected',
              payload: { group_id: undefined },
            } satisfies GroupSelectedAction)
          }>Все группы</p>
      {groups.map((group) => (
        <p
          key={group.id}
          onClick={() =>
            dispatch({
              type: 'groupSelected',
              payload: { group_id: group.id },
            } satisfies GroupSelectedAction)
          }
          style={{ cursor: 'pointer', color: isSelected(group.id) ? 'violet' : undefined }}
        >
          {group.name}
        </p>
      ))}
    </div>
  );
};

export default GroupsList;
