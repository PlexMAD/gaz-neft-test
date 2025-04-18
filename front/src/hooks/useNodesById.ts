import { useAppSelector } from "../store/store";
import { GroupId, Node } from "../store/store";
import { useMemo } from "react";

const useNodesById = (id: GroupId | undefined): Node[] => {
  const group = useAppSelector((state) =>
    id ? state.groups.entities[id] : undefined
  );

  const nodes = useMemo(() => group?.nodes ?? [], [group]);

  return nodes;
};

export default useNodesById;
