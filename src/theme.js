const Theme = {
    init() {
        const savedColor = Storage.loadTheme();
        this.setColor(savedColor);
        this.renderPicker();
    },
    setColor(color) {
        document.documentElement.style.setProperty('--accent-color', color);
        const hoverColor = Utils.adjustBrightness(color, -30);
        document.documentElement.style.setProperty('--accent-hover', hoverColor);
        Storage.saveTheme(color);
        this.updatePickerButtons(color);
    },
    renderPicker() {
        const picker = document.getElementById('themePicker');
        picker.innerHTML = `
      <label>Theme Color:</label>
      <div class="color-options">
        ${CONSTANTS.COLORS.theme.map(c => `
          <button class="color-btn" style="background: ${c.color};" 
                  onclick="Theme.setColor('${c.color}')" 
                  title="${c.title}"></button>
        `).join('')}
      </div>
    `;
    },
    updatePickerButtons(activeColor) {
        document.querySelectorAll('.color-btn').forEach(btn => {
            if (btn.style.background === activeColor) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
};
window.addEventListener('DOMContentLoaded', () => Theme.init());
