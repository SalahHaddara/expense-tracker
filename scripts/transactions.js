class TransactionManager {
    constructor() {
        this.transactions = utils.getFromLocalStorage("transactions");
    }

    save() {
        utils.saveToLocalStorage("transactions", this.transactions);
    }

    addTransaction(transaction) {
        this.transactions.push({...transaction, id: Date.now()});
        this.save();
    }

    delete(id) {
        this.transactions = this.transactions.filter(transaction => {
            return transaction.id !== id;
        });
        this.save();
    }

    edit(id, updatedTransaction) {
        const index = this.transactions.findIndex(transaction =>
            transaction.id === id
        );
        if (index !== -1) {
            this.transactions[index] = {...updatedTransaction, id};
            this.save();
        }
    }
}