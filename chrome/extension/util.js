export function getGreeting() {
    const hour = new Date().getHours();
    return "<b>Good " + (hour < 12 ? "Morning" : (hour < 18 ? "Afternoon" : "Evening")) + "!</b>";
}
