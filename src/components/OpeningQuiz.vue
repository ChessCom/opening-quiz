<template>
  <div class="quiz-container">
    <header>
      <img
        src="assets/images/header-logo-desktop.svg"
        alt="Opening quiz heading"
        width="229px"
        onclick="window.location.href='/'"
        style="cursor: pointer"
      />
    </header>

    <div class="progress-bar-container">
      <div class="progress-bar">
        <div
          class="progress-bar-item"
          v-for="index in 7"
          :key="index"
          :class="{
            completed: selectedAnswers.length >= index,
          }"
        ></div>
      </div>
    </div>
    <div>
      <div
        class="question-text mobile"
        v-if="currentQuestionIndex < questions.length"
      >
        <div class="questions-answered">{{ selectedAnswers.length }} of 7</div>
        <h2 v-if="questions[currentQuestionIndex]">
          {{ questions[currentQuestionIndex].question }}
        </h2>
      </div>
      <div
        class="question-container"
        v-if="currentQuestionIndex < questions.length"
      >
        <div class="question-img">
          <img :src="questions[currentQuestionIndex].questionImage" />
        </div>
        <div class="question-content">
          <div class="question-text desktop">
            <div class="questions-answered">
              {{ selectedAnswers.length }} of 7
            </div>
            <h2>{{ questions[currentQuestionIndex].question }}</h2>
          </div>

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
              v-for="(option, index) in questions[currentQuestionIndex].options"
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
      <div class="results-container" v-else>
        <div>
          <ChessBoardComponent
            v-if="openingDetails"
            :moves="convertedMoves"
            :openingFor="openingDetails?.openingFor || ''"
            :openingName="openingDetails?.Name || ''"
            :courseLink="openingDetails?.courseLink || ''"
            :chessableCourseCover="openingDetails?.chessableCourseCover || ''"
            :chessableCourseTitle="openingDetails?.chessableCourseTitle || ''"
            :chessableCourseAuthor="openingDetails?.chessableCourseAuthor || ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import questions from "@/data/questions.json";
import results from "@/data/results.json";
import ecoCodes from "@/data/eco-codes.json";
import ChessBoardComponent from "@/components/ChessBoardComponent.vue";

export default {
  components: {
    ChessBoardComponent,
  },
  data() {
    return {
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
    openingDetails() {
      const ecoCode = this.resultEcoCode;
      console.log("Resolved ECO Code:", ecoCode);

      if (!ecoCode || !this.ecoCodes[ecoCode]) {
        console.log("No matching opening found for ECO Code:", ecoCode);
        return null;
      }

      const resultKey = this.selectedAnswers.join(" - ").toLowerCase();
      const result = results[resultKey] || {};

      return {
        ...this.ecoCodes[ecoCode],
        openingFor: result.openingFor || "Unknown",
        courseLink: result.courseLink || "", // Fetch from results.json
        chessableCourseCover: result.chessableCourseCover || "", // Fetch from results.json
        chessableCourseTitle: result.chessableCourseTitle || "", // Fetch from results.json
        chessableCourseAuthor: result.chessableCourseAuthor || "", // Fetch from results.json
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
      this.selectedAnswers.push(value);
      this.handleConditionalQuestions(value);
    },
    // selectOption(value) {
    //   this.selectedAnswers = [...this.selectedAnswers, value]; // Creates a new reactive array
    //   this.handleConditionalQuestions(value);
    // },
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
      console.log("Sanitized Moves String:", sanitizedString);
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
  flex-direction: column;
  gap: 6px;
  align-items: center;
  padding: 32px 0;
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

.question-img > img {
  width: 100%;
}

.question-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 45px;
}

.question-text.mobile {
  display: none;
}

.subtext {
  color: rgba(255, 255, 255, 0.72);
  font-size: 18px;
  line-height: 1em;
}

.question-text .questions-answered {
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.question-text h2 {
  color: #fff;
  font-family: "Chess Sans";
  font-size: 31px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px; /* 116.129% */
  text-wrap: balance;
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
  font-size: 20px;
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

@media only screen and (max-width: 900px) {
  .question-container {
    gap: 24px;
  }
}

@media only screen and (max-width: 768px) {
  .mobile {
    display: block;
  }

  .desktop {
    display: none;
  }

  header {
    padding: 24px;
  }

  header > img {
    max-width: 155px;
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
  }

  .question-text.mobile h2 {
    color: #fff;
    font-family: "Chess Sans";
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px; /* 114.286% */
  }
  .question-container {
    gap: 16px;
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
</style>
