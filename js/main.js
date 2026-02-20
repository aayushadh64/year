// Main Entry Point
// No imports needed - scripts are loaded in index.html

// Global Error Handler
window.onerror = function (msg, url, lineNo, columnNo, error) {
    const errorBox = document.createElement('div');
    errorBox.style.position = 'fixed';
    errorBox.style.top = '0';
    errorBox.style.left = '0';
    errorBox.style.width = '100%';
    errorBox.style.background = 'rgba(255, 0, 0, 0.8)';
    errorBox.style.color = 'white';
    errorBox.style.padding = '10px';
    errorBox.style.zIndex = '9999';
    errorBox.innerHTML = `<strong>Error:</strong> ${msg} <br> <small>${url}:${lineNo}</small>`;
    document.body.appendChild(errorBox);
    return false;
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("AntiGravity: Initializing Universe...");

    // Initialize Background
    const bg = new PetalRain('starfield'); // Reusing canvas ID for simplicity styling
    bg.init();

    // Initialize Cursor Glow (Level 10)
    new window.CursorGlow();

    // Initialize Audio (will wait for user interaction)
    const musicPlayer = new window.MusicPlayer(); // Ensure window access
    window.musicPlayer = musicPlayer; // Expose globally for stages (Stage 6/7) to accept

    // Attempt Auto-Play
    musicPlayer.play();

    // Fallback: Play on first interaction if auto-play blocked
    document.body.addEventListener('click', () => {
        if (!musicPlayer.isPlaying) {
            musicPlayer.play();
            const btn = document.getElementById('music-toggle');
            if (btn) btn.innerText = "🎵 Music On";
        }
    }, { once: true });

    // Initialize Stage Manager
    const stageManager = new StageManager('stage-container');

    // Start Experience
    stageManager.start();

    // UI Controls
    const musicBtn = document.getElementById('music-toggle');
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            musicPlayer.toggle();
            musicBtn.innerText = musicPlayer.isPlaying ? "🎵 Music On" : "🎵 Music Off";
        });
    }
});
