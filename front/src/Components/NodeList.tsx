import React, { FC } from 'react';
import { useAppSelector } from '../store/store';
import NodeItem from './NodeItem';

const NodeList: FC = () => {
    const selectedGroupId = useAppSelector(store => store.groups.selectedGroupId);
    const entities = useAppSelector(store => store.groups.entities);
    
    let nodes = Object.values(entities)
        .filter(group => selectedGroupId ? group.group_id === selectedGroupId : true)
        .flatMap(group => group.nodes);
    
    return (
        <ul>
            {nodes.map((node) => (
                <NodeItem node={node} key={node.id}/>
            ))}
        </ul>
    );
};

export default NodeList;