import { FC } from 'react';
import { Metric, Node } from '../store/store';
import MetricCharts from './MetricCharts';

interface NodeItemInfoProps {
    node: Node,
    metricForNode: Metric
}

const NodeItemInfo: FC<NodeItemInfoProps> = ({node, metricForNode}) => {
    return (
        <div className='info-page__node-long-info'>
           <MetricCharts cpu_utilization={metricForNode.cpu_utilization} disk_utilization={metricForNode.disk_utilization} memory_utilization={metricForNode.memory_utilization}/>
           <div>
               <p>Админ: {node.admin.name}</p>
               <p>Приложение: {node.application.app_name}</p>
           </div>
           <div className='info-page__node-interface-info'>
               <p>Интерфейс: {node.interface.caption}</p>
               <p>Статус: {node.interface.status.description}</p>
           </div>
        </div>
    );
};

export default NodeItemInfo;