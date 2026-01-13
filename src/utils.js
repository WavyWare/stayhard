const Utils = {
    adjustBrightness(color, amount) {
        const col = parseInt(color.slice(1), 16);
        const r = Math.max(0, Math.min(255, (col >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((col >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (col & 0x0000FF) + amount));
        return "#" + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
    },
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '139, 115, 85';
    },
    getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }
};
