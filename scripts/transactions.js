class TransactionManager {
    constructor() {
        this.transactions = utils.getFromLocalStorage("transactions");
    }

    save() {
        utils.saveToLocalStorage("transactions", this.transactions);
    }

    add(transaction) {
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

    getFiltered({type, minAmount, maxAmount, date, searchText}) {
        return this.transactions.filter(t => {
            const matchesType = type === 'all' || t.type === type;
            const matchesAmount = t.amount >= (minAmount || 0) && t.amount <= (maxAmount || Infinity);
            const matchesDate = !date || t.date === date;
            const matchesNotes = !searchText || t.notes.toLowerCase().includes(searchText.toLowerCase());

            return matchesType && matchesAmount && matchesDate && matchesNotes;
        });
    }

    calculateTotals() {
        let totalIncome = 0;
        let totalExpense = 0;

        this.transactions.forEach(transaction => {
            if (transaction.type === 'income') {
                totalIncome += transaction.amount;
            } else {
                totalExpense += transaction.amount;
            }
        });

        const balance = totalIncome - totalExpense;

        return {
            income: totalIncome,
            expense: totalExpense,
            balance: balance
        };
    }
}