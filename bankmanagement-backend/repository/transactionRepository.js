let transactionsArray = [];

export const transactionRepository = {
    findAll: () => transactionsArray,

    findById: (id) => transactionsArray.find(t => t.id === id),

    create: (transaction) => {
        const newTransaction = { id: Date.now().toString(), ...transaction };
        transactionsArray.push(newTransaction);
        return newTransaction;
    }
}