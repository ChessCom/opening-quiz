<template>
  <div class="quiz-container">
    <header>
      <div class="header-left">
        <!-- Back Button: Always visible if there is history (except on the first question) -->
        <div
          v-if="
            currentQuestionIndex < questions.length &&
            questionHistory.length > 1
          "
          class="back-button-container mobile2"
        >
          <button @click="goBack" class="back-button">
            <svg
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.17999 14.91C8.05443 14.7952 7.95415 14.6555 7.88554 14.4999C7.81693 14.3442 7.78149 14.1759 7.78149 14.0058C7.78149 13.8357 7.81693 13.6674 7.88554 13.5118C7.95415 13.3561 8.05443 13.2164 8.17999 13.1016L17.3383 3.89664C17.4588 3.77059 17.6037 3.6704 17.7641 3.6022C17.9246 3.534 18.0973 3.49922 18.2717 3.49997C18.4462 3.49783 18.6193 3.53198 18.78 3.60026C18.9407 3.66854 19.0854 3.76947 19.205 3.89664L20.57 5.26164C20.695 5.38293 20.7944 5.52797 20.8626 5.68825C20.9307 5.84854 20.9661 6.02082 20.9667 6.19497C20.9656 6.36561 20.9299 6.53426 20.8617 6.69068C20.7935 6.84711 20.6943 6.98806 20.57 7.10497L13.6283 14.105L20.57 20.93C20.6937 21.0473 20.7926 21.1883 20.8608 21.3447C20.9289 21.501 20.9649 21.6694 20.9667 21.84C20.9636 22.0103 20.927 22.1783 20.859 22.3345C20.7909 22.4906 20.6927 22.6318 20.57 22.75L19.205 24.1383C19.0854 24.2655 18.9407 24.3664 18.78 24.4347C18.6193 24.503 18.4462 24.5371 18.2717 24.535C18.0973 24.5357 17.9246 24.5009 17.7641 24.4327C17.6037 24.3645 17.4588 24.2644 17.3383 24.1383L8.17999 14.91Z"
                fill="white"
                fill-opacity="0.5"
              /></svg
            >Back
          </button>
        </div>
      </div>
      <img
        src="assets/images/header-logo-desktop.svg"
        alt="Opening quiz heading"
        width="229px"
        onclick="window.location.href='/'"
        style="cursor: pointer"
      />
      <div class="header-right"></div>
    </header>

    <ProgressBar
      :total="7"
      :currentIndex="currentQuestionIndex"
      :answeredCount="selectedAnswers.length"
      :answers="selectedAnswers"
      :labels="[
        'Chess Level',
        'Color',
        'First move',
        'Opponent’s move',
        'Play style',
        'Memorization',
        'Opening type',
      ]"
      @step-click="onProgressClick"
    />

    <div>
      <!-- Mobile Question Text -->
      <div
        class="question-text mobile"
        v-if="currentQuestionIndex < questions.length"
      >
        <div class="question-left">
          <div class="questions-answered">{{ currentQuestionNumber }} of 7</div>
          <div class="coach">
            <img
              src="assets/images/coach.svg"
              width="44"
              height="44"
              alt="coach"
            />
          </div>
        </div>
        <div class="bubble-text">
          <img
            src="assets/images/bubble-part.svg"
            height="15"
            width="10"
            class="bubble-part"
          />
          <h2 v-if="questions[currentQuestionIndex]">
            {{ questions[currentQuestionIndex].question }}
          </h2>
        </div>
      </div>

      <!-- Transition for Question Container / Results -->
      <transition name="slide-fade" mode="out-in">
        <div
          class="question-container"
          v-if="currentQuestionIndex < questions.length"
          :key="currentQuestionIndex"
        >
          <div class="question-img">
            <img :src="questions[currentQuestionIndex].questionImage" />
          </div>
          <div class="question-content">
            <div class="question-text desktop">
              <div class="question-left">
                <div class="questions-answered">
                  {{ currentQuestionNumber }} of 7
                </div>
                <div class="coach">
                  <img
                    src="assets/images/coach.svg"
                    width="44"
                    height="44"
                    alt="coach"
                  />
                </div>
              </div>
              <div class="bubble-text">
                <img
                  src="assets/images/bubble-part.svg"
                  height="15"
                  width="10"
                  class="bubble-part"
                />
                <h2>{{ questions[currentQuestionIndex].question }}</h2>
              </div>
            </div>

            <!-- Answer Options -->
            <div class="answers-container" v-if="currentQuestionIndex === 6">
              <div
                class="answer-item"
                v-for="(option, index) in getPlayStyleOptions()"
                :key="index"
                @click="selectOption(option.value)"
                :class="{ selected: previousAnswer === option.value }"
              >
                <div class="answer-item-img">
                  <img
                    :src="option.icon"
                    width="68"
                    height="68"
                    alt="answer image nerodo"
                  />
                </div>
                <div class="answer-item-text">
                  <span>{{ option.text }}</span>
                  <span class="subtext">{{ option.subtext }}</span>
                </div>
              </div>
            </div>
            <div class="answers-container" v-else>
              <div
                class="answer-item"
                v-for="(option, index) in questions[currentQuestionIndex]
                  .options"
                :key="index"
                @click="selectOption(option.value)"
                :class="{ selected: previousAnswer === option.value }"
              >
                <div class="answer-item-img">
                  <img
                    :src="option.icon"
                    width="68"
                    height="68"
                    alt="answer image"
                  />
                </div>
                <div class="answer-item-text">
                  <span>{{ option.text }}</span>
                  <span class="subtext">{{ option.subtext }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Recommended Opening Section -->
        <div class="results-container" v-else key="result">
          <div>
            <ResultPage
              v-if="openingDetails && openingDetails.Name"
              :moves="convertedMoves"
              :openingFor="openingDetails?.openingFor || 'Unknown'"
              :openingName="openingDetails?.Name || 'Unknown Opening'"
              :courseLink="openingDetails?.courseLink || ''"
              :chessableCourseCover="openingDetails?.chessableCourseCover || ''"
              :chessableCourseTitle="openingDetails?.chessableCourseTitle || ''"
              :chessableCourseAuthor="
                openingDetails?.chessableCourseAuthor || ''
              "
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import questions from "@/data/questions.json";
import results from "@/data/results.json";
import ecoCodes from "@/data/eco-codes.json";
import ResultPage from "@/views/ResultPage.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  components: { ResultPage, ProgressBar },
  data() {
    return {
      questionHistory: [{ index: 0, answers: [] }],
      currentQuestionIndex: 0,
      selectedAnswers: [],
      questions: questions,
      ecoCodes: ecoCodes,
      initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      allAnswers: [],
    };
  },
  computed: {
    previousAnswer() {
      return this.allAnswers[this.currentQuestionIndex];
    },
    progressLabels() {
      const color = this.selectedAnswers[1];
      // Base two questions
      const labels = ["Chess Level", "Color"];
      if (color === "black") {
        // Q3…Q7 for Black
        labels.push(
          "Opponent’s move",
          "", // skipped
          "Play style",
          "Memorization",
          "Opening type"
        );
      } else {
        // Q3…Q7 for White or no preference
        labels.push(
          "First move", // or "Your move" if you prefer
          "Opponent’s move",
          "Play style",
          "Memorization",
          "Opening type"
        );
      }
      return labels;
    },
    resultEcoCode() {
      const key = this.selectedAnswers
        .map((ans) => ans.toLowerCase().trim())
        .join(" - ");
      const result = results[key];
      return result ? result.ecoCode : "No ECO Code found";
    },
    currentQuestionNumber() {
      return this.selectedAnswers.length + 1;
    },
    openingDetails() {
      const ecoCode = this.resultEcoCode;
      if (!ecoCode || !this.ecoCodes[ecoCode]) return null;
      const resultKey = this.selectedAnswers.join(" - ").toLowerCase();
      const result = results[resultKey] || {};
      return { ...this.ecoCodes[ecoCode], ...result };
    },
    convertedMoves() {
      if (this.openingDetails && this.openingDetails.Moves) {
        return this.openingDetails.Moves.replace(/\d+\./g, "")
          .trim()
          .split(/\s+/);
      }
      return [];
    },
  },
  methods: {
    selectOption(value) {
      // Update the answer in allAnswers
      this.allAnswers[this.currentQuestionIndex] = value;

      this.questionHistory.push({
        index: this.currentQuestionIndex,
        answers: [...this.selectedAnswers],
      });
      this.selectedAnswers.push(value);
      this.handleConditionalQuestions(value);
      if (this.currentQuestionIndex >= this.questions.length) {
        sessionStorage.setItem("quizAnswers", this.selectedAnswers.join(","));
        this.$router.push({
          path: "/result",
          query: { ecoCode: this.resultEcoCode },
        });
      }
    },
    /**
     * Jump back to any completed question when the progress-bar dot is clicked.
     * Trims selectedAnswers & history, then sets the current index.
     */
    onProgressClick(stepIndex) {
      // only allow clicking dots for questions you've already answered
      if (this.selectedAnswers.length > stepIndex) {
        // 1) Trim answers array back to that question
        this.selectedAnswers = this.selectedAnswers.slice(0, stepIndex);

        // 2) Trim history so it matches (keep the initial state + one per answered question)
        this.questionHistory = this.questionHistory.slice(0, stepIndex + 1);

        // 3) Jump the quiz back to that question index
        this.currentQuestionIndex = stepIndex;

        // 4) Handle conditional questions based on color selection
        if (stepIndex === 2 && this.selectedAnswers[1] === "black") {
          this.currentQuestionIndex = 3;
        }
      }
    },
    goBack() {
      if (this.questionHistory.length > 1) {
        const prev = this.questionHistory.pop();
        this.currentQuestionIndex = prev.index;
        this.selectedAnswers = prev.answers;
      }
    },
    goToQuestion(stepIndex) {
      // Reset the quiz from the selected step
      this.currentQuestionIndex = stepIndex;
      this.selectedAnswers = this.selectedAnswers.slice(0, stepIndex);
      this.questionHistory = [
        { index: stepIndex, answers: [...this.selectedAnswers] },
      ];
    },
    handleConditionalQuestions(value) {
      switch (this.currentQuestionIndex) {
        case 1:
          this.handleSecondQuestion(value);
          break;
        case 2:
          this.handleThirdQuestion(value);
          break;
        case 3:
          this.handleBlackThirdQuestion(value);
          break;
        case 4:
        case 5:
          this.currentQuestionIndex = 6;
          break;
        default:
          this.currentQuestionIndex++;
      }
    },
    handleSecondQuestion(value) {
      if (value === "white") {
        this.currentQuestionIndex = 2;
      } else if (value === "black") {
        this.currentQuestionIndex = 3;
      } else {
        // For "no preference", we still want to count this as an answer
        // and allow going back to it
        this.currentQuestionIndex = 6;
        // Add empty strings for the skipped questions
        this.selectedAnswers.push("", "");
      }
    },
    handleThirdQuestion(value) {
      if (value === "e4") {
        this.currentQuestionIndex = 4;
      } else if (value === "d4") {
        this.currentQuestionIndex = 5;
      } else {
        this.currentQuestionIndex = 6;
        this.selectedAnswers.push("");
      }
    },
    handleBlackThirdQuestion(value) {
      if (value === "e4" || value === "d4") {
        this.selectedAnswers.push("");
        this.currentQuestionIndex = 6;
      } else {
        this.currentQuestionIndex++;
      }
    },
    shouldRemoveTrading() {
      const combos = [
        ["advanced", "black", "other", ""],
        ["intermediate", "black", "other", ""],
        ["advanced", "white", "e4", "c5"],
        ["intermediate", "white", "e4", "c5"],
        ["advanced", "white", "e4", "other"],
        ["intermediate", "white", "e4", "other"],
        ["advanced", "white", "other", ""],
        ["intermediate", "white", "other", ""],
        ["beginner", "white", "d4", "Nf6"],
        ["beginner", "black", "other", ""],
        ["beginner", "white", "e4", "c5"],
        ["beginner", "white", "e4", "other"],
        ["beginner", "white", "other", ""],
        ["advanced", "white", "d4", "other"],
        ["intermediate", "white", "d4", "other"],
        ["beginner", "white", "d4", "other"],
      ];
      return combos.some((combo) =>
        combo.every((ans, i) => this.selectedAnswers[i] === ans)
      );
    },
    getPlayStyleOptions() {
      let opts = [
        {
          text: "Attacking",
          subtext: "Aggressive all the way.",
          value: "attacking",
          icon: "assets/images/answers/05-01.svg",
        },
        {
          text: "Counter-attacking",
          subtext: "Waiting for mistakes and punish them.",
          value: "counter-attacking",
          icon: "assets/images/answers/05-02.svg",
        },
        {
          text: "Balanced",
          subtext: "Good moves = Good chess.",
          value: "balanced",
          icon: "assets/images/answers/05-03.svg",
        },
        {
          text: "Positional",
          subtext: "Controlling the board with patient strategy.",
          value: "positional",
          icon: "assets/images/answers/05-04.svg",
        },
        {
          text: "Trading",
          subtext: "Exchange pieces and win the endgame.",
          value: "trading",
          icon: "assets/images/answers/05-05.svg",
        },
      ];
      if (this.shouldRemoveTrading())
        opts = opts.filter((o) => o.value !== "trading");
      return opts;
    },
    convertMovesToArray(moves) {
      return moves ? moves.replace(/\d+\./g, "").trim().split(/\s+/) : [];
    },
    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.selectedAnswers = [];
      this.questionHistory = [{ index: 0, answers: [] }];
    },
  },
  mounted() {
    this.resetQuiz();
  },
};
</script>

<style scoped>
.quiz-container {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

header {
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
  padding: 32px 0;
  justify-content: space-between;
}

.header-left,
.header-right {
  width: 200px;
}

header span {
  color: #81b64c;
  font-family: "Chess Sans";
  font-size: 30px;
  font-style: normal;
  line-height: 100%; /* 30px */
  letter-spacing: 1.5px;
  font-weight: 700;
  letter-spacing: 1.5px;
  transform: scaleX(1.18);
  transform-origin: left;
}

.back-button {
  all: unset;
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text-bolder, rgba(255, 255, 255, 0.72));
  cursor: pointer;
  display: flex;
  gap: 0px;
  justify-content: center;
  align-items: center;
  transition: color 0.3s;
}

.back-button:hover {
  color: white;
}

.back-button svg path {
  fill: currentColor !important;
}

.progress-bar-container {
  margin-bottom: 41px;
}

.question-container {
  display: flex;
  gap: 70px;
  align-items: start;
}

.question-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.question-img {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
}

.question-left {
  display: flex;
  flex-direction: column;
  gap: 11px;
  justify-content: end;
}

.question-img > img {
  width: 100%;
}

.question-text {
  display: flex;
  gap: 20px;
  margin-bottom: 45px;
}

.question-text.mobile {
  display: none;
}

.subtext {
  color: rgba(255, 255, 255, 0.72);
  font-size: 16px;
  line-height: 1em;
}

.question-text .questions-answered {
  color: rgba(255, 255, 255, 0.72);
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.question-text h2 {
  color: #312e2b;
  font-family: "Chess Sans";
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
}

.bubble-text {
  position: relative;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.95);
  padding: 16px;
}

.bubble-part {
  position: absolute;
  left: -9px;
  bottom: 10px;
}

.coach {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  display: flex;
  justify-content: center;
  align-items: end;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.answers-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.answer-item {
  border-radius: 10px;
  padding: 10px 20px 10px 11px;
  display: flex;
  gap: 16px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.1) inset;
  align-items: center;
  cursor: pointer;
}

.answer-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transition: background 200ms ease-in-out;
}

.answer-item.selected {
  border: 2px solid #81b64c;
}

.answer-item-img {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  min-width: max-content;
}

.answer-item-img img {
  width: 68px;
  height: 68px;
  min-width: 68px;
  min-height: 68px;
}

.answer-item-text {
  display: flex;
  gap: 6px;
  flex-direction: column;
}

.answer-item-text span:nth-child(1) {
  color: #fff;
  font-family: "Chess Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 1em;
}

.debug-section {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}

.mobile2 {
  display: none;
}

@media only screen and (max-width: 900px) {
  .question-container {
    gap: 24px;
  }
}

@media only screen and (max-width: 768px) {
  .mobile {
    display: block;
  }

  .mobile2 {
    display: flex;
  }

  .desktop {
    display: none;
  }

  header {
    padding: 24px 0;
  }

  header > img {
    max-width: 155px;
  }

  .back-button {
    font-size: 14px;
    display: flex;
  }

  .back-button svg {
    width: 14px;
    height: 14px;
  }

  .question-container {
    flex-direction: column;
  }

  .question-img img {
    width: 100%;
    height: auto;
  }

  .progress-bar-container {
    margin-bottom: 24px;
  }

  .progress-bar-item {
    height: 10px;
  }

  .question-text.mobile {
    display: flex;
    margin-bottom: 16px;
    align-items: end;
  }

  .question-text.mobile h2 {
    color: #312e2b;
    font-family: "Chess Sans";
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }
  .question-container {
    gap: 16px;
  }

  .question-text.mobile .bubble-text {
    padding: 10px;
  }

  .question-text.mobile .question-left {
    gap: 8px;
  }

  .answer-item-img img {
    width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
  }

  .answer-item {
    padding: 10px;
  }

  .quiz-container {
    margin-bottom: 24px;
  }

  .action-btn-container {
    flex-direction: column;
  }
}

/* animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  /* Separate easing for transform and opacity for a smoother feel */
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.2s ease;
  will-change: transform, opacity;
}

.slide-fade-enter-from {
  transform: translateX(30px); /* Subtle slide from the right */
  opacity: 0;
}

.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-to {
  transform: translateX(-50px); /* Subtle slide to the left */
  opacity: 0;
}
</style>
