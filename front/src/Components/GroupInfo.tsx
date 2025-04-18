import { FC } from "react";
import ServiceStatusInfo from "./ServiceStatusInfo";
import GroupStatusInfo from "./GroupStatusInfo";
import GroupsList from "./GroupsList";

const GroupInfo: FC = () => {
  return (
    <div className="info-page__group-info">
      <ServiceStatusInfo />
      <GroupStatusInfo />
      <GroupsList />
    </div>
  );
};

export default GroupInfo;
