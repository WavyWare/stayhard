const App = {
    init() {
        GoalListRenderer.render();
        LegendRenderer.render();
        GridRenderer.renderAll();
    }
};
window.addEventListener('DOMContentLoaded', () => App.init());
