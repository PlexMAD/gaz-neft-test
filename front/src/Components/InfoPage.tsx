import { useDispatch } from 'react-redux';
import { AppDispatch, GroupsStoredAction, Metric, MetricStoredAction } from '../store/store';
import { useEffect, useState } from 'react';
import InfoColumn from './UI/InfoColumn';
import GroupInfo from './GroupInfo';
import NodeList from './NodeList';

const InfoPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentHour, setCurrentHour] = useState<number>(0);

  const fetchGroups = async () => {
    const response = await fetch("http://127.0.0.1:23456/api/groups");
    const data = await response.json();
    for (let group of data) {
      group.nodes = JSON.parse(group.nodes);
    }
    return data;
  };

  const fetchMetrics = async () => {
    const response = await fetch("http://127.0.0.1:23456/api/metrics");
    let data = await response.json();
    
    data = data.filter((item: Metric) => {
      const metricHour = new Date(item.datetime).getHours(); 
      return metricHour === currentHour;
    });
    return data;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour((prev) => (prev + 1) % 11);
    }, 1000);

    
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    fetchGroups().then(data => {
      dispatch({ type: 'groupsStored', payload: { groups: data } } satisfies GroupsStoredAction);
    });
    fetchMetrics().then(data => {
      dispatch({ type: 'metricStored', payload: { metrics: data } } satisfies MetricStoredAction);
    });
  }, [currentHour]); 

  return (
    <div className="info-page">
      <InfoColumn child={GroupInfo}/>
      <InfoColumn child={NodeList}/>
    </div>
  );
};

export default InfoPage;