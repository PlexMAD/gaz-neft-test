import { useDispatch } from 'react-redux';
import { AppDispatch, GroupsStoredAction } from '../store/store'; 
import { useEffect } from 'react';
import InfoColumn from './UI/InfoColumn';
import GroupInfo from './GroupInfo';
import NodeInfo from './NodeInfo';

const InfoPage = () => {
  const dispatch = useDispatch<AppDispatch>();


  const fetchInfo = async () => {
    const response = await fetch("http://127.0.0.1:23456/api/groups");
    const data = await response.json();
    for (let group of data) {
      group.nodes = JSON.parse(group.nodes);
    }
    console.log(data)
    return data;
  };

  useEffect(() => {
    fetchInfo().then(data => {
      dispatch({ type: 'groupsStored', payload: { groups: data } } satisfies GroupsStoredAction);
    });
  }, []); 

  return (
    <div className="info-page">
      <InfoColumn child={GroupInfo}/>
      <InfoColumn child={NodeInfo}/>
    </div>
  );
};

export default InfoPage;
