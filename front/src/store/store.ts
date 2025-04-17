import { configureStore } from '@reduxjs/toolkit';

import { useSelector, useDispatch } from 'react-redux';


type Interface = {
  id: number;
  caption: string;
  status: Status;
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
  selectedNodeId: NodeId | undefined;
}
type State = {
  groups: GroupState;
  metrics: MetricState
  
}
type MetricId = number

export type Metric = {
  metric_id: MetricId,
  datetime: Date,
  cpu_utilization: number,
  memory_utilization: number,
  disk_utilization: number,
  node_id: NodeId,
}

export type MetricState = {
  entities: Record<MetricId, Metric>;
  ids: MetricId[];
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
    group_id: GroupId | undefined;
  };
};

export type NodeSelectedAction = {
  type: "nodeSelected";
  payload: {
    node_id: NodeId;
  };
};

export type MetricStoredAction = {
  type: "metricStored";
  payload: {
    metrics: Metric[];
  };
};

export type Action = GroupsStoredAction | GroupSelectedAction | NodeSelectedAction | MetricStoredAction



const initialGroupState: GroupState = {
  entities: {},
  ids: [],
  selectedGroupId: undefined,
  selectedNodeId: undefined
}
const initialMetricState : MetricState = {
  entities: {},
  ids: []
}

const initialState: State = {
  groups: initialGroupState,
  metrics: initialMetricState
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
        }
        
      } 
      case 'groupSelected':
        const {group_id} = action.payload
        return {
          ...state,
          groups: {
            ...state.groups,
            selectedGroupId: group_id,
            
          }
        }   
        case 'nodeSelected':
          const {node_id} = action.payload
          return {
            ...state,
            groups: {
              ...state.groups,
              selectedNodeId: node_id, 
            }
          }   
        case 'metricStored':
          const {metrics} = action.payload
          return {
            ...state,
            metrics: {
              ...state.metrics,
              entities: metrics.reduce((acc, metric) => {
                acc[metric.metric_id] = metric;
                return acc;
              }, {} as Record<MetricId, Metric>),
              ids: metrics.map((metric) => metric.metric_id),
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