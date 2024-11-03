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
}