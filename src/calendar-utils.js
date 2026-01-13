const CalendarUtils = {
    getMonthDates(monthOffset = 0) {
        const today = new Date();
        const month = today.getMonth() - monthOffset;
        const year = today.getFullYear() - Math.floor((today.getMonth() - monthOffset) / 12);
        const actualMonth = ((month % 12) + 12) % 12;
        const firstDay = new Date(year, actualMonth, 1);
        const lastDay = new Date(year, actualMonth + 1, 0);
        const startingDayOfWeek = firstDay.getDay();
        const dates = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            dates.push(null);
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const date = new Date(year, actualMonth, i);
            dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
    },
    getMonthLabel(monthOffset = 0) {
        const today = new Date();
        const month = today.getMonth() - monthOffset;
        const year = today.getFullYear() - Math.floor((today.getMonth() - monthOffset) / 12);
        const actualMonth = ((month % 12) + 12) % 12;
        return `${CONSTANTS.MONTH_NAMES[actualMonth]} ${year}`;
    },
    getRealDates(monthOffset = 0) {
        return this.getMonthDates(monthOffset).filter(d => d !== null);
    }
};
