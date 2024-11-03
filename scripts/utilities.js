const utils = {
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }
};