import React, { useEffect, useState } from "react";
import { encodeFunctionData, formatEther, parseEther } from "viem";
import { Icons } from "../../components/common/icons";
import { Label } from "../../components/ui/label";
import { RadioGroupItem } from "../../components/ui/radio-group";
import { useAuthContext } from "../../context/AuthContext";

import { cn } from "../../lib/utils";
import { PlusCircle, Info, Loader2 } from "lucide-react";
import { routes } from "../../lib/routes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { publicClient } from "../../publicClient";
import { abi, contractAddress } from "../../contract";
import { RawTransactionStatusQuery, useOkto, type OktoContextType } from "okto-sdk-react";
import { tokenAbi, tokenAddress } from "../../token";
interface GroupProps {
  id: bigint;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const GroupRadio: React.FC<GroupProps> = ({
  id,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [groupInfo, setGroupInfo] = useState<any>([]);
  const { setGroupId, user, setTransactions } = useAuthContext();
  const { depositAmount, setDepositAmount, groupId } = useAuthContext();
  const [text, setText] = useState<string>("Continue");
  const [isLoading, setIsLoading] = useState(false);
  const { executeRawTransaction, getRawTransactionStatus } = useOkto() as OktoContextType;
  const { baseAddress } = useAuthContext();
  const navigate = useNavigate();

  const getGroupData = async () => {
    try {
      const data = await publicClient.readContract({
        address: contractAddress,
        abi: abi ?? [],
        functionName: 'groups',
        args: [BigInt(id ?? 0)]
      })
      console.log(data);
      setGroupInfo(data);
    } catch (error) {
      console.log("An error occured", error);
    }
  }

  const approve = async () => {
    try {
      setIsLoading(true);
      const res = await executeRawTransaction({
        network_name: "POLYGON_TESTNET_AMOY",
        transaction: {
          from: baseAddress,
          to: tokenAddress,
          value: "0x0",
          data: encodeFunctionData({
            abi: tokenAbi ?? [],
            functionName: 'approve',
            args: [contractAddress, parseEther("1000")]
          })
        }
      })
      console.log(res);
      const query: RawTransactionStatusQuery = {
        order_id: res?.jobId
      }
      const status = await getRawTransactionStatus(query)
      console.log(status);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("An error occured ", error);
    }
  }



  function formatViemBalance(balance: bigint): string {
    const balanceInEther = parseFloat(formatEther(balance));
    const formattedBalance = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(balanceInEther);

    if (balanceInEther >= 1000000) {
      return `${formattedBalance}`;
    } else if (balanceInEther >= 1000) {
      return `${formattedBalance}`;
    } else {
      return formattedBalance;
    }
  }

  const onClick = () => {
    setDepositAmount(Number(formatEther(groupInfo[0])));
    setGroupId(id);
  };

  useEffect(() => {
    getGroupData();
  }, [])


  return (
    <div
      onMouseEnter={(e) => {
        e.stopPropagation();
        onMouseEnter();
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        onMouseLeave();
      }}
      className="relative"
    >
      {groupInfo && (
        <div onClick={onClick} key={`groups-${Number(id)}`}>
          <RadioGroupItem
            value={String(id)}
            id={String(id)}
            className="hidden"
          />
          <Label>
            <div
              className={cn(
                "space-y-8 rounded-[8px] border border-[#D7D9E4] bg-white p-4 shadow-[0px_4px_8px_0px_#0000000D]",
              )}
            >
              <Icons.bitcoinBag className="h-10 w-10" />
              <div className="space-y-1 font-normal">
                <p className="text-xs leading-[14px] text-[#098C28]">
                  # {groupInfo[0] ? formatViemBalance(groupInfo[0]) : 0}
                </p>
                <p className="text-base font-semibold leading-[18px] text-[#0A0F29]">
                  {groupInfo[9]}
                </p>
              </div>
            </div>
          </Label>
        </div>
      )}
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center rounded-[8px] bg-black bg-opacity-50">
          <Sheet>
            <SheetTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="mr-2 rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
              >
                <PlusCircle size={24} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="rounded-tl-[50px] rounded-tr-[50px]"
            >
              <SheetHeader>
                <SheetTitle>Make Deposit</SheetTitle>

                <SheetDescription className="pb-32">
                  <p className="text-md mb-4 text-left font-medium leading-[18px] text-[#0A0F29]">
                    Deposit to {groupInfo[9]} group
                  </p>
                  <form className="space-y-5">
                    <div>
                      <Input
                        placeholder="Enter the amount you want to repay"
                        className="tect-base font-medium text-[#696F8C] placeholder:text-[#696F8C]"
                        value={depositAmount}
                      />
                    </div>
                    <div className="flex items-center justify-center gap-x-5"></div>
                    <Button
                      className="flex text-white bg-[#4A9F17]"
                      onClick={() => approve()}
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {text}
                    </Button>
                  </form>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          {/* <Link href={routes.groupById(id.toString())}> */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(routes.groupById(id.toString()));
            }}
            className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            <Info size={24} />
          </button>
          {/* </Link> */}
        </div>
      )}
    </div>
  );
};

export default GroupRadio;