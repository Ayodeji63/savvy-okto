import { string } from 'zod';

export type Tuple<
    T,
    MaxLength extends number = 10,
    Current extends T[] = [],
> = Current['length'] extends MaxLength
    ? Current
    : Current | Tuple<T, MaxLength, [T, ...Current]>;

export type userSchema = {
    username: string;
    address: string;
};

export type transactionSchema = {
    fromAddress: string,
    toAddress: string,
    amount: string,
    type: string,
    transactionHash: string,
    status: string,
}
