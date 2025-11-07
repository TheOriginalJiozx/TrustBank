import { transactionRepository } from "../repository/transactionRepository";
import { categorizeTransaction  } from "./categorizeService";

export const transactionService = {
    getAll: () => transactionRepository.findAll(),

    getById: (id) => transactionRepository.getById(),

    create: (transaction) => {
        if (!transaction.category && transaction.description) {
            transaction.category = categorizeTransaction(transaction.description);
        }
        return transactionRepository.create(transaction);
    }
};