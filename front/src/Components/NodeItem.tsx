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
        <li className='info-page__node-list'>
            <div className="info-page__node-short-info">
                <div>
                    <div style={{backgroundColor: node.status.color, width: 15, height: 15, borderRadius: 30, display: 'inline-block'}}></div>
                    <p className='info-page__node-header'>{node.caption}</p>
                </div>
                <div className='info-page__node-metrics'>
                    <p style={{color: returnColor(metricForNode.cpu_utilization)}}>CPU {metricForNode.cpu_utilization}</p>
                    <p style={{color: returnColor(metricForNode.disk_utilization)}}>disk {metricForNode.disk_utilization}</p>
                    <p style={{color: returnColor(metricForNode.memory_utilization)}}>memory {metricForNode.memory_utilization}</p>
                </div>
            </div>
            <NodeItemInfo node={node} metricForNode={metricForNode}/>
        </li>
    );
};

export default NodeItem;