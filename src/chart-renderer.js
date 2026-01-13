const ChartRenderer = {
    drawChart(canvasId, goal, entries, monthOffset) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = CONSTANTS.CHART.HEIGHT * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        const realDates = CalendarUtils.getRealDates(monthOffset);
        const values = realDates.map(date => {
            const val = entries[date];
            if (goal.type === CONSTANTS.GOAL_TYPES.BOOLEAN) {
                return val ? 1 : 0;
            }
            return parseInt(val) || 0;
        });
        const maxValue = Math.max(...values, 1);
        const width = rect.width;
        const height = CONSTANTS.CHART.HEIGHT;
        const padding = CONSTANTS.CHART.PADDING;
        const graphWidth = width - padding * 2;
        const graphHeight = height - padding * 2;
        this.drawBackground(ctx, width, height, padding, graphWidth, graphHeight);
        this.drawBars(ctx, realDates, values, maxValue, padding, graphWidth, graphHeight, width, height, goal.color);
    },
    drawBackground(ctx, width, height, padding, graphWidth, graphHeight) {
        ctx.fillStyle = '#f5f1ed';
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = '#d4ccc0';
        ctx.lineWidth = 1;
        ctx.strokeRect(padding, padding, graphWidth, graphHeight);
    },
    drawBars(ctx, dates, values, maxValue, padding, graphWidth, graphHeight, width, height, color) {
        const barWidth = graphWidth / (dates.length > 0 ? dates.length : 1);
        dates.forEach((date, index) => {
            const value = values[index];
            const normalizedValue = value / maxValue;
            const barHeight = normalizedValue * graphHeight;
            const x = padding + index * barWidth + barWidth / 2 - CONSTANTS.CHART.BAR_WIDTH / 2;
            const y = padding + graphHeight - barHeight;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, CONSTANTS.CHART.BAR_WIDTH, barHeight);
            ctx.fillStyle = '#8b8b7a';
            ctx.font = '9px Lora, serif';
            ctx.textAlign = 'center';
            ctx.fillText(parseInt(date.split('-')[2]), padding + index * barWidth + barWidth / 2, height - 5);
        });
    }
};
