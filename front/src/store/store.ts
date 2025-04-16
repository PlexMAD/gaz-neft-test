import { configureStore } from '@reduxjs/toolkit';

import { useSelector, useDispatch } from 'react-redux';


type Interface = {
  id: number;
  caption: string;
}

type Application = {
  app_id: number;
  app_name: string;
}

type Admin = {
  id: number;
  name: string;
}

export type NodeId = number

export type Status = {
  color: string;
  description: string;
}
export type Node = {
  id: NodeId;
  caption: string;
  status: Status;
  interface: Interface;
  application: Application;
  admin: Admin
}

export type GroupId = number;
export type Group = {
  group_id: GroupId;
  group_name: string;
  nodes: Node[]
}
export type GroupState = {
  entities: Record<GroupId, Group>;
  ids: GroupId[];
  selectedGroupId: GroupId | undefined;
}
type State = {
  groups: GroupState;
}



export type GroupsStoredAction = {
  type: "groupsStored";
  payload: {
    groups: Group[];
  };
};

export type GroupSelectedAction = {
  type: "groupSelected";
  payload: {
    group_id: GroupId;
  };
};

export type Action = GroupsStoredAction | GroupSelectedAction



const initialGroupState: GroupState = {
  entities: {},
  ids: [],
  selectedGroupId: undefined
}

const initialState: State = {
  groups: initialGroupState,
};



const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'groupsStored':
      const {groups} = action.payload
      return {
        ...state,
        groups: {
          ...state.groups,
          entities: groups.reduce((acc, group) => {
            acc[group.group_id] = group;
            return acc;
          }, {} as Record<GroupId, Group>),
          ids: groups.map((group) => group.group_id),
          selectedGroupId: state.groups.selectedGroupId
        }
        
      } 
      case 'groupSelected':
        const {group_id} = action.payload
        return {
          ...state,
          groups: {
            ...state.groups,
            selectedGroupId: group_id
          }
        }   
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: reducer,
});


export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()