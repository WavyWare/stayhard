const LegendRenderer = {
    render() {
        const legend = document.getElementById('chartLegend');
        legend.innerHTML = `
      <div class="legend-item">
        <div class="legend-color" style="background: #e8dfd5;"></div>
        <span>No data</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: rgba(139, 115, 85, 0.25);"></div>
        <span>Low</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: rgba(139, 115, 85, 0.45);"></div>
        <span>Medium</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: rgba(139, 115, 85, 0.65);"></div>
        <span>High</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: rgba(139, 115, 85, 0.85);"></div>
        <span>Max</span>
      </div>
    `;
    }
};
