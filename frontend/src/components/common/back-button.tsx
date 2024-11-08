// import { useUiStore } from "@/store/useUiStore";
import { ChevronLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUiStore } from "../../store/useUiStore";

const BackButton = () => {
  // const router = useRouter();
  const navigate = useNavigate();

  const { page } = useUiStore();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    useUiStore.persist.rehydrate();
  }, []);

  const handleNavigation = () => {

    // router.back();
    navigate(-1);
  };

  return <ChevronLeft className="text-[white]" onClick={handleNavigation} />;
};

export default BackButton;
