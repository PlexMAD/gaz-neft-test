SELECT 
    g.id AS group_id,
    g.caption AS group_name,
    JSON_GROUP_ARRAY(
        JSON_OBJECT(
            'id', n.id,
            'caption', n.caption,
            'status', JSON_OBJECT(
                'color', s.color,
                'description', s.description
            ),
            'interface', JSON_OBJECT(
                'id', i.id,
                'caption', i.caption
            ),
            'application', (
                SELECT JSON_OBJECT(
                    'app_id', a.id,
                    'app_name', a.caption
                )
                FROM nodes_applications na
                JOIN applications a ON na.application_id = a.id
                WHERE na.node_id = n.id
                LIMIT 1
            ),
            'admin', JSON_OBJECT(
                'id', u.id,
                'name', u.firstname || ' ' || u.lastname
            )
        )
    ) AS nodes
FROM 
    groups g
LEFT JOIN 
    groups_nodes gn ON g.id = gn.group_id
LEFT JOIN 
    nodes n ON gn.node_id = n.id
LEFT JOIN 
    statuses s ON n.status = s.id
LEFT JOIN 
    interfaces i ON n.interface = i.id
LEFT JOIN 
    users u ON n.admin = u.id
GROUP BY 
    g.id, g.caption
ORDER BY 
    g.id;
