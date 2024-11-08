'use client'
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { createContext, useEffect } from "react"


// Remove this line as it's not needed and may cause issues
// import { undefined } from "zod";

export interface User {
    id: string;
    username: string;
    address: string;
}

type Transaction = {
    data: string | null;
    type: string;
    id: string;
    status: string;
    amount: string;
    transactionHash: string;
    fromAddress: string;
    toAddress: string;
    createdAt: Date;
    userId: string;
}

interface IAuthContext {
    userGroupId: bigint[];
    setUserGroupId: (value: bigint[]) => void;
    depositAmount: number;
    setDepositAmount: (value: number) => void;
    groupId: bigint | undefined;
    setGroupId: (value: bigint) => void;
    CARDS: Card[];
    setCARDS: Dispatch<SetStateAction<Card[]>>;
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
    transactions: Transaction[] | undefined;
    setTransactions: Dispatch<SetStateAction<Transaction[] | undefined>>;
    transaction: Transaction | undefined;
    setTransaction: Dispatch<SetStateAction<Transaction | undefined>>;
    userDetails: any;
    setUserDetails: Dispatch<SetStateAction<any>>;
    baseAddress: string;
    setBaseAddress: Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext({} as IAuthContext);

export type Card = {
    id: number;
    text: string;
    value: string;
    className?: string;
};

export default function AuthContextProvider({ children }: { children: React.ReactNode; }) {
    const [userDetails, setUserDetails] = useState(null);
    const [userGroupId, setUserGroupId] = useState<bigint[]>([])
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [groupId, setGroupId] = useState<bigint>();
    const [user, setUser] = useState<User>();
    const [transactions, setTransactions] = useState<Transaction[]>()
    const [transaction, setTransaction] = useState<Transaction>()
    const [baseAddress, setBaseAddress] = useState<string>("");
    const [CARDS, setCARDS] = useState<Card[]>([
        {
            id: 0,
            text: "Total Group Savings",
            value: "#200,000",
            className: "bg-gradient-to-bl from-[#00A6C2] to-[#70E77E]",
        },
        {
            id: 1,
            className: "bg-gradient-to-bl from-[#1544DF] to-[#00A6C2]",
            text: "Total Group members",
            value: "10",
        },
        {
            id: 2,
            className: "bg-gradient-to-bl from-[#6C40D9] to-[#A858EE]",
            text: "Total loan given out",
            value: "#250,000",
        },
    ])



    return (
        <AuthContext.Provider value={{
            userGroupId,
            setUserGroupId,
            depositAmount,
            setDepositAmount,
            groupId,
            setGroupId,
            CARDS,
            setCARDS,
            user,
            setUser,
            transactions,
            setTransactions,
            transaction,
            setTransaction,
            userDetails,
            setUserDetails,
            baseAddress,
            setBaseAddress
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);