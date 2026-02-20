
window.StageManager = class StageManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentStageIndex = 0;
        this.stages = [
            'Stage1', // The Universe Awakens
            'Stage2', // The Gravity Test
            'Stage3', // Memory Explosion
            'Stage4', // Poetic Interludes 1
            'Stage5', // Interactive Love Quiz
            'Stage6', // Secret Date Unlock
            'Stage7', // Floating Envelope Letter
            'Stage8', // Final Universe Shift
            'Stage9'  // Finale
        ];
    }

    start() {
        this.loadStage(this.stages[0]);
    }

    loadStage(stageName) {
        console.log(`Loading stage: ${stageName}`);

        // Clear container with fade out effect if needed
        this.container.innerHTML = '';
        this.container.className = ''; // Reset classes

        try {
            // In non-module version, classes are global
            const StageClass = window[stageName];

            if (StageClass) {
                const stage = new StageClass(this.container, () => this.nextStage());
                stage.init();
            } else {
                console.error(`Stage class not found: ${stageName}`);
            }
        } catch (error) {
            console.error(`Failed to load stage ${stageName}:`, error);
        }
    }

    nextStage() {
        this.currentStageIndex++;
        if (this.currentStageIndex < this.stages.length) {
            this.loadStage(this.stages[this.currentStageIndex]);
        } else {
            console.log("Experience complete.");
        }
    }
}
