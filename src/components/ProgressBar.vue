<template>
  <div class="progress-bar-container">
    <div class="progress-bar">
      <div
        v-for="step in total"
        :key="step"
        class="progress-bar-item"
        :class="{
          completed: answeredCount >= step,
          clickable:
            answeredCount >= step &&
            step - 1 !== currentIndex &&
            !skipIndices.includes(step - 1),
          skipped: skipIndices.includes(step - 1),
          active: step === answeredCount + 1 && !isReviewing,
          reviewing: step - 1 === currentIndex && isReviewing,
        }"
        @click="onStepClick(step - 1)"
        :data-label="tooltipLabel(step - 1, step)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    total: {
      type: Number,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    answeredCount: {
      type: Number,
      required: true,
    },
    // ← new: the quiz’ array of answers (including "" for skips)
    answers: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["step-click"],
  computed: {
    // zero‑based indexes where answer === "" => a skipped question
    skipIndices() {
      return this.answers
        .map((a, i) => (a === "" && i !== 1 ? i : -1)) // Exclude index 1 (color question)
        .filter((i) => i >= 0);
    },
  },
  methods: {
    onStepClick(idx) {
      // only emit if answered AND not skipped
      if (this.answeredCount > idx && !this.skipIndices.includes(idx)) {
        this.$emit("step-click", idx);
      }
    },
    tooltipLabel(idx, step) {
      // Always show "Skipped" for any auto‑skipped dot
      if (this.skipIndices.includes(idx)) {
        return "Skipped";
      }

      const color = this.answers[1]; // "white", "black", or ""

      // BLACK path (when the user chose Black in Q2):
      // Q3 (idx=2)   → Opponent's move
      // Q4 (idx=3)   → auto‑skipped by skipIndices
      // Q5 (idx=4)   → Play style
      // Q6 (idx=5)   → Memorization
      // Q7 (idx=6)   → Opening type
      if (color === "black") {
        if (idx === 2) return "Opponent's move";
        if (idx === 4) return this.labels[4] || "Play style";
        if (idx === 5) return this.labels[5] || "Memorization";
        if (idx === 6) return this.labels[6] || "Opening type";
      }

      if (color === "white") {
        if (idx === 2) return "Your move";
        if (idx === 3) return "Opponent's move";
      }

      // All other cases (including when color==="white") fall back:
      return this.labels[idx] || `Question ${step}`;
    },
  },
};
</script>

<style scoped>
.progress-bar-container {
  width: 100%;
}
.progress-bar {
  display: flex;
  gap: 2px;
}

.progress-bar-container,
.progress-bar {
  overflow: visible;
}

.progress-bar-item {
  position: relative;
  border-radius: 0px;
  background: rgba(255, 255, 255, 0.05);
  height: 12px;
  width: 100%;
  transition: background-color 0.2s ease;
}
.progress-bar-item.completed {
  background-color: #81b64c;
}

.progress-bar-item.completed.clickable {
  cursor: pointer;
  opacity: 1;
}

.progress-bar-item.completed.clickable:hover {
  background: linear-gradient(
      0deg,
      rgba(129, 182, 76, 0.3) 0%,
      rgba(129, 182, 76, 0.3) 100%
    ),
    #3c3a37;
}

.progress-bar > :first-child {
  border-radius: 4px 0px 0px 4px;
}

.progress-bar > :nth-child(7) {
  border-radius: 0px 4px 4px 0px;
}

.progress-bar-item.active {
  background: linear-gradient(
      0deg,
      rgba(129, 182, 76, 0.3) 0%,
      rgba(129, 182, 76, 0.3) 100%
    ),
    #3c3a37;
}

.progress-bar-item.skipped {
  background: #81b64c;
  cursor: default;
}

/* tooltip */
.progress-bar-item:hover::after {
  content: attr(data-label);
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.95);
  color: #312e2b;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  z-index: 10;
  font: 14px;
  font-weight: 600;
}
</style>
