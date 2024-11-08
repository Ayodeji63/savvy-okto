
// import { prisma } from "./db";
// import { transactionSchema, userSchema } from "../types/utils"

// export async function findUser(address: string) {
//   const user = await prisma.user.findFirst({
//     where: {
//       address: address,
//     },
//   });
//   console.log(user);
//   return user;
// }

// export async function findUserTransactions(user: string) {
//   const transactions = await prisma.transaction.findMany({
//     where: {
//       fromAddress: user,
//     }
//   })
//   console.log(transactions);
//   return transactions;
// }

// export async function findTransaction(hash: string) {
//   const transaction = await prisma.transaction.findUnique({
//     where: {
//       transactionHash: hash

//     }
//   })
//   console.log(transaction);
//   return transaction;
// }

// export async function createUser(params: userSchema) {
//   const user = await prisma.user.create({
//     data: {
//       username: params.username,
//       address: params.address,
//     }
//   })

//   return user;
// }
// export async function createTransaction(params: transactionSchema) {
//   // First find the user
//   const user = await prisma.user.findUnique({
//     where: { username: params.fromAddress }
//   });

//   if (!user) {
//     throw new Error('User not found');
//   }

//   // Then create the transaction
//   await prisma.transaction.create({
//     data: {
//       fromAddress: params.fromAddress,
//       toAddress: params.toAddress,
//       amount: params.amount,
//       type: params.type,
//       transactionHash: params.transactionHash,
//       status: params.status,
//       user: {
//         connect: { id: user.id }
//       }
//     }
//   })
// }