import GroupPageClientSide from "./components/client-side";
import { useParams } from "react-router-dom";
const GroupPage = () => {
  const { id } = useParams();
  return (
    <>
      <GroupPageClientSide {...{ id }} />
      {/* <FloatingNavBar /> */}
    </>
  );
};

export default GroupPage;
