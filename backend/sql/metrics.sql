SELECT 
    m.id AS metric_id,
    m.datetime,
    m.cpu_utilization,
    m.memory_utilization,
    m.disk_utilization,
    n.id AS node_id
FROM 
    metrics m
JOIN 
    nodes n ON m.node_id = n.id
LEFT JOIN
    statuses s ON n.status = s.Id
ORDER BY 
    m.datetime;
