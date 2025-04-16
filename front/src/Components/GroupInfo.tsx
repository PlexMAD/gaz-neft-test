import { FC } from "react";
import ServiceStatusInfo from "./ServiceStatusInfo";
import GroupStatusInfo from "./GroupStatusInfo";
import GroupsList from "./GroupsList";

const GroupInfo: FC = () => {
  return (
    <>
      <ServiceStatusInfo />
      <GroupStatusInfo />
      <GroupsList />
    </>
  );
};

export default GroupInfo;
