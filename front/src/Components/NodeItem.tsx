import { FC } from 'react';
import { Node, useAppSelector } from '../store/store';
import NodeItemInfo from './NodeItemInfo';

interface NodeItemProps {
    node: Node,
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
    const metrics = useAppSelector((state) => state.metrics) 
    const metricForNode = Object.values(metrics.entities).find((metric) => metric.node_id === node.id)
    if (!metricForNode) return null;
    return (
        <div style={{display: 'flex', gap: 10}}>
            <div style={{backgroundColor: node.status.color, width: 15, height: 15, borderRadius: 30}}></div>
            <p>{node.caption}</p>
            <p style={{color: returnColor(metricForNode.cpu_utilization)}}>CPU {metricForNode.cpu_utilization}</p>
            <p style={{color: returnColor(metricForNode.disk_utilization)}}>disk {metricForNode.disk_utilization}</p>
            <p style={{color: returnColor(metricForNode.memory_utilization)}}>memory {metricForNode.memory_utilization}</p>
            <NodeItemInfo node={node} metricForNode={metricForNode}/>
        </div>
    );
};

export default NodeItem;