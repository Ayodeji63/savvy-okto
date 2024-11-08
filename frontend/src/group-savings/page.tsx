
import PageWrapper from "../components/common/page-wrapper";
import { RadioGroup } from "../components/ui/radio-group";
import useDisclosure from "../hooks/use-disclosure.hook";
import { routes } from "../lib/routes";
import { useUiStore } from "../store/useUiStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { type InferType, number, object, string } from "yup";


// import Group from "../components/group";
import GroupRadio from "./components/radiogroup";
import { formatEther } from "viem";
import WelcomeBanner from "./components/WelcomeBanner";
import SavingsTips from "./components/SavingsTips";
import FloatingNavBar from "../Navbar";
import { publicClient } from "../publicClient";
import { abi, contractAddress } from "../contract";
import { useAuthContext } from "../context/AuthContext";

const depositSchema = object({
  group: string().required("group is required"),
  amount: number()
    .positive("Invalid input")
    .integer("Invalid input")
    .typeError("Invalid input")
    .required("Amount is required"),
});

type FormData = InferType<typeof depositSchema>;

const DepositPage = () => {
  const { setPage } = useUiStore();
  const [amount, setAmount] = useState<string>("");
  const [text, setText] = useState<string>("Continue");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [hoveredId, setHoveredId] = useState<bigint | null>(null);
  const { baseAddress } = useAuthContext();
  const [userGroups, setUserGroups] = useState<any>()

  const handleGroupClick = (group: SetStateAction<null>) => {
    setSelectedGroup(group);
  };



  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { },
  } = useForm<FormData>({
    resolver: yupResolver(depositSchema),
  });

  const onSubmit = () => {
    // console.log(data);
    // onOpen();
    // onClick();
  };

  const getUserGroups = async () => {
    const data = await publicClient.readContract({
      address: contractAddress,
      abi: abi ?? [],
      functionName: 'getUserGroups',
      args: [baseAddress]
    })
    console.log(data)
    setUserGroups(data);
  }

  const handleAmountInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);

    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  useEffect(() => {
    setPage({ previousRouter: routes.dashboard });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    useUiStore.persist.rehydrate();
    // refectUserGroupId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getUserGroups();
  }, []);

  const [totalSavings, growthRate, totalGroups] = [10000, 5.2, 3]; // Fetch these from your API

  function formatViemBalance(balance: bigint): string {
    // Convert the balance to a number
    const balanceInEther = parseFloat(formatEther(balance));

    // Format the number with commas
    const formattedBalance = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(balanceInEther);

    // Add magnitude representation for millions and thousands
    if (balanceInEther >= 1000000) {
      return `${formattedBalance}`;
    } else if (balanceInEther >= 1000) {
      return `${formattedBalance}`;
    } else {
      return formattedBalance;
    }
  }
  let _userGroupId: any;
  return (
    <>
      <main className="container mx-auto px-4 py-2">
        {/* <div className="flex items-center bg-[#4A9F17] p-4 text-white shadow-lg">
          <BackButton />
          <h1 className="text-xl font-bold">Group Savings</h1>
        </div> */}
        <WelcomeBanner />
        {/* <QuickStats
          totalSavings={formatViemBalance(userTotalSavings ?? BigInt("0"))}
          growthRate={userTotalSavings && userTotalSavings > 0 ? Math.ceil(
            Number(
              (Number(_userGroupId?.length) /
                Number(
                  formatEther(
                    userTotalSavings ? userTotalSavings : BigInt("1"),
                  ),
                )) *
              100,
            ),
          ) : 0}
          totalGroups={Number(_userGroupId?.length)}
        /> */}
        <PageWrapper>
          <>
            {userGroups ? (
              userGroups.length > 0 && (
                <h2 className="mb-4 py-4 text-lg font-semibold leading-[18px] text-[#0A0F29]">
                  Your Savings Group
                </h2>
              )
            ) : (
              <h2 className="mb-4 py-4 text-lg font-semibold leading-[18px] text-[#0A0F29]">
                Join A Telegram Group
              </h2>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Controller
                  name="group"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      onValueChange={onChange}
                      defaultValue={value}
                      className="grid grid-cols-2 gap-x-4 gap-y-2"
                    >
                      {/*@ts-ignore*/}
                      {userGroups?.map((id) => (
                        <GroupRadio
                          id={id}
                          key={id.toString()}
                          isHovered={hoveredId === id}
                          onMouseEnter={() => setHoveredId(id)}
                          onMouseLeave={() => setHoveredId(null)}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>
            </form>
          </>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <SavingsTips />
            {/* <RecentActivity activities={recentActivities} /> */}
          </div>
        </PageWrapper>
      </main>
      <FloatingNavBar />
    </>
  );
};

export default DepositPage;
