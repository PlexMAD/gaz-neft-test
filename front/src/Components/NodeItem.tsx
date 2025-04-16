import { FC } from 'react';
import { Node, useAppSelector } from '../store/store';
import InfoColumn from './UI/InfoColumn';
import NodeItemInfo from './NodeItemInfo';

interface NodeItemProps {
    node: Node
}


function returnColor(metricCurrent: number| undefined) {
    if (!metricCurrent) {
        return ''
    }
    if (metricCurrent < 85 ) {
        return ''
    }
    else if (metricCurrent > 95) {
        return 'red'
    }
    else return 'yellow'
}
const NodeItem: FC<NodeItemProps> = ({node}) => {
    const metricForNode = useAppSelector((state) => Object.values(state.metrics.entities).find((metric) => metric.node_id === node.id))
    return (
        <div style={{display: 'flex'}}>
            <div style={{backgroundColor: node.status.color, width: 50, height: 50}}></div>
            <p>{node.caption}</p>
            <p style={{color: returnColor(metricForNode?.cpu_utilization)}}>CPU {metricForNode?.cpu_utilization}</p>
            <p style={{color: returnColor(metricForNode?.disk_utilization)}}>disk {metricForNode?.disk_utilization}</p>
            <p style={{color: returnColor(metricForNode?.memory_utilization)}}>memory {metricForNode?.memory_utilization}</p>
            <InfoColumn child={NodeItemInfo}/>
        </div>
    );
};

export default NodeItem;