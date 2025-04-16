import { GroupId, useAppSelector, Node } from "../store/store";


const useNodesById = (id: GroupId | undefined): Node[] => {
  return useAppSelector((state) => {
    const group = Object.values(state.groups.entities).find((group) => group.group_id === id);
    return group?.nodes ?? [];
  });
};

export default useNodesById;
