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
          class="back-button-container desktop"
        >
          <button @click="goBack" class="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <g filter="url(#filter0_d_917_6056)">
                <path
                  d="M6.70005 14.4333L13.4334 21.1667C14.6 22.3333 15.0667 22.3333 16.2334 21.1667C17.4 20 17.4 19.5333 16.2334 18.3333L9.90005 12L16.2334 5.63333C17.4 4.46666 17.4 4 16.2334 2.83333C15.0667 1.66666 14.6 1.66666 13.4 2.83333L6.70005 9.56666C5.16672 11.0667 5.16672 12.9333 6.70005 14.4333Z"
                  fill="white"
                  fill-opacity="0.72"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_917_6056"
                  x="0"
                  y="0"
                  width="24"
                  height="25"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_917_6056"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_917_6056"
                    result="shape"
                  />
                </filter>
              </defs></svg
            >Previous Question
          </button>
        </div>
        <div
          v-if="
            currentQuestionIndex < questions.length &&
            questionHistory.length > 1
          "
          class="back-button-container mobile2"
        >
          <button @click="goBack" class="back-button mobile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <g filter="url(#filter0_d_917_6056)">
                <path
                  d="M6.70005 14.4333L13.4334 21.1667C14.6 22.3333 15.0667 22.3333 16.2334 21.1667C17.4 20 17.4 19.5333 16.2334 18.3333L9.90005 12L16.2334 5.63333C17.4 4.46666 17.4 4 16.2334 2.83333C15.0667 1.66666 14.6 1.66666 13.4 2.83333L6.70005 9.56666C5.16672 11.0667 5.16672 12.9333 6.70005 14.4333Z"
                  fill="white"
                  fill-opacity="0.72"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_917_6056"
                  x="0"
                  y="0"
                  width="24"
                  height="25"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_917_6056"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_917_6056"
                    result="shape"
                  />
                </filter>
              </defs></svg
            >Previous
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

    <div class="progress-bar-container">
      <div class="progress-bar">
        <div
          v-for="index in 7"
          :key="index"
          class="progress-bar-item"
          :class="{ completed: selectedAnswers.length >= index }"
        ></div>
      </div>
    </div>

    <div>
      <!-- Mobile Question Text -->
      <div
        class="question-text mobile"
        v-if="currentQuestionIndex < questions.length"
      >
        <div class="question-left">
          <div class="questions-answered">{{ currentQuestionNumber }} of 7</div>
          <div class="coach">
            <img src="assets/images/coach.svg" width="44" height="44" alt="coach"/>
          </div>
        </div>
        <div class="bubble-text">
          <img src="assets/images/bubble-part.svg" height="15" width="10" class="bubble-part"/>
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
                  <img src="assets/images/coach.svg" width="44" height="44" alt="coach"/>
                </div>
              </div>
              <div class="bubble-text">
                <img src="assets/images/bubble-part.svg" height="15" width="10" class="bubble-part"/>
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

export default {
  components: {
    ResultPage,
  },
  directives: {},
  data() {
    return {
      questionHistory: [{ index: 0, answers: [] }], // Store history of question indexes
      currentQuestionIndex: 0,
      selectedAnswers: [],
      questions: questions,
      ecoCodes: ecoCodes,
      initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    };
  },
  computed: {
    resultEcoCode() {
      const key = this.selectedAnswers
        .map((answer) => answer.toLowerCase().trim())
        .join(" - ");
      console.log("Generated Key:", key);
      const result = results[key];
      return result ? result.ecoCode : "No ECO Code found";
    },
    currentQuestionNumber() {
      return this.selectedAnswers.length + 1;
    },
    openingDetails() {
      const ecoCode = this.resultEcoCode;
      console.log("Resolved ECO Code:", ecoCode);

      if (!ecoCode || !this.ecoCodes[ecoCode]) {
        console.log("No matching opening found for ECO Code:", ecoCode);
        return null;
      }

      const resultKey = this.selectedAnswers.join(" - ").toLowerCase();
      const result = results[resultKey] || {};

      if (!result) {
        console.warn("No result found for generated key:", resultKey);
        return null;
      }

      return {
        ...this.ecoCodes[ecoCode],
        openingFor: result.openingFor || "Unknown",
        courseLink: result.courseLink || "",
        chessableCourseCover: result.chessableCourseCover || "",
        chessableCourseTitle: result.chessableCourseTitle || "",
        chessableCourseAuthor: result.chessableCourseAuthor || "",
      };
    },
    convertedMoves() {
      if (this.openingDetails && this.openingDetails.Moves) {
        return this.convertMovesToArray(this.openingDetails.Moves);
      }
      return [];
    },
    openingForColor() {
      const isEven = this.convertedMoves.length % 2 === 0;
      return `${isEven ? "Black" : "White"}`;
    },
  },
  methods: {
    selectOption(value) {
      // Save the current state (before any changes)
      this.questionHistory.push({
        index: this.currentQuestionIndex,
        answers: [...this.selectedAnswers],
      });

      // Add the new answer
      this.selectedAnswers.push(value);

      // Update currentQuestionIndex using your custom logic
      this.handleConditionalQuestions(value);

      // Check if we've reached the end of the questions
      if (this.currentQuestionIndex >= this.questions.length) {
        sessionStorage.setItem("quizAnswers", this.selectedAnswers.join(","));
        this.$router.push({
          path: "/result",
          query: { ecoCode: this.resultEcoCode },
        });
      }
    },
    goBack() {
      // Ensure there's a previous state to revert to (don't pop the initial state)
      if (this.questionHistory.length > 1) {
        const previousState = this.questionHistory.pop();
        this.currentQuestionIndex = previousState.index;
        this.selectedAnswers = previousState.answers;
      }
    },
    handleConditionalQuestions(value) {
      switch (this.currentQuestionIndex) {
        case 1:
          this.handleSecondQuestion(value);
          break;
        case 2:
          this.handleThirdQuestion(value);
          break;
        case 4:
        case 5:
          this.currentQuestionIndex = 6;
          break;
        case 3:
          this.handleBlackThirdQuestion(value);
          break;
        default:
          this.currentQuestionIndex++;
          break;
      }
    },
    handleSecondQuestion(value) {
      if (value === "white") {
        this.currentQuestionIndex = 2;
      } else if (value === "black") {
        this.currentQuestionIndex = 3;
      } else if (value === "") {
        this.currentQuestionIndex = 6;
        this.selectedAnswers.push("", "");
      }
    },
    handleThirdQuestion(value) {
      if (value === "e4") {
        this.currentQuestionIndex = 4;
      } else if (value === "d4") {
        this.currentQuestionIndex = 5;
      } else if (value === "other" || value === "") {
        this.currentQuestionIndex = 6;
        this.selectedAnswers.push("");
      }
    },
    handleBlackThirdQuestion(value) {
      if (value === "e4" || value === "d4") {
        this.selectedAnswers.push("");
        this.currentQuestionIndex = 6;
      } else if (value === "other" || value === "") {
        this.selectedAnswers.push("");
        this.currentQuestionIndex = 6;
      } else {
        this.currentQuestionIndex++;
      }
    },
    shouldRemoveTrading() {
      const combinations = [
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

      return combinations.some((combination) => {
        return combination.every(
          (answer, index) => this.selectedAnswers[index] === answer
        );
      });
    },
    getPlayStyleOptions() {
      let options = [
        {
          text: "Agressive",
          subtext: "Always looking for attacks.",
          value: "attacking",
          icon: "assets/images/answers/05-01.svg",
        },
        {
          text: "Evasive",
          subtext: "Waiting for mistakes and countering.",
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
          text: "Resilient",
          subtext: "Trading early and winning the endgame.",
          value: "trading",
          icon: "assets/images/answers/05-05.svg",
        },
      ];

      if (this.shouldRemoveTrading()) {
        options = options.filter((option) => option.value !== "trading");
      }

      return options;
    },
    convertMovesToArray(movesString) {
      if (!movesString) return [];
      const sanitizedString = movesString.replace(/\d+\./g, "").trim(); // Remove move numbers
      return sanitizedString.split(/\s+/);
    },
    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.selectedAnswers = [];
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

.progress-bar {
  display: flex;
  gap: 4px;
}

.progress-bar-item {
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  height: 12px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.progress-bar-item.completed {
  background: #81b64c;
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
  font-size:  12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.question-text h2 {
  color: #312E2B;
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
  bottom: 10px
}

.coach {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  display: flex;
  justify-content: center;
  align-items: end;
  background: rgba(0, 0, 0, 0.20);
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
    color: #312E2B;
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
