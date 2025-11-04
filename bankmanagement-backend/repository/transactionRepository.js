let transactionsArray = []; // midlertidig storage

export const transactionRepository = {
    findAll: () => transactionsArray,

    findById: (id) => transactionsArray.find(t => t.id === id),

    create: (transaction) => {
        const newTransaction = { id: Date.now().toString(), ...transaction };
        transactionsArray.push(newTransaction);
        return newTransaction;
    },

    update: (id, updated) => {
        const index = transactionsArray.findIndex(t => t.id === id);
        if (index === -1) return null;
        transactionsArray[index] = { ...transactionsArray[index], ...updated };
        return transactionsArray[index];
    },

    delete: (id) => {
        const index = transactionsArray.findIndex(t => t.id === id);
        if (index === -1) return false;
        transactionsArray.splice(index, 1);
        return true;
    }
}