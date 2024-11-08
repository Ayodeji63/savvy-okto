import FloatingNavBar from "@/app/Navbar";
import GroupPageClientSide from "./components/client-side";

const GroupPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <GroupPageClientSide {...{ id }} />
      {/* <FloatingNavBar /> */}
    </>
  );
};

export default GroupPage;
