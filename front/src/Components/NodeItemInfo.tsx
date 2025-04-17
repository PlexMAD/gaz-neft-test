import { FC } from 'react';
import { Metric, Node } from '../store/store';
import MetricCharts from './MetricCharts';

interface NodeItemInfoProps {
    node: Node,
    metricForNode: Metric
}

const NodeItemInfo: FC<NodeItemInfoProps> = ({node, metricForNode}) => {
    return (
        <div style={{display: 'flex', gap: 10}}>
           <p>Админ: {node.admin.name}</p>
           <p>Приложение: {node.application.app_name}</p>
           <p>Интерфейс: {node.interface.caption}</p>
           <p>Статус: {node.interface.status.description}</p>
           <MetricCharts cpu_utilization={metricForNode.cpu_utilization} disk_utilization={metricForNode.disk_utilization} memory_utilization={metricForNode.memory_utilization}/>
        </div>
    );
};

export default NodeItemInfo;