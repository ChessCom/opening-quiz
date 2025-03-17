<template>
  <div class="quiz-container">
    <header>
      <img
        src="/assets/images/opening.png"
        width="229"
        height="35"
        alt="Opening quiz heading"
      />
      <span>QUIZ</span>
    </header>

    <div class="progress-bar-container">
      <div class="progress-bar">
        <!-- Progress bar items (7 in total) -->
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

    <!-- Quiz Questions Section -->
    <div>
      <div
        class="question-container"
        v-if="currentQuestionIndex < questions.length"
      >
        <div class="question-img">
          <img src="/assets/images/chess_board.jpg" width="512" height="512" />
        </div>
        <div class="question-content">
          <div class="question-text">
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
                  src="/assets/images/green.jpg"
                  width="68"
                  height="68"
                  alt="answer image"
                />
              </div>
              <div class="answer-item-text">
                <span>{{ option.text }}</span>
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
                  src="/assets/images/green.jpg"
                  width="68"
                  height="68"
                  alt="answer image"
                />
              </div>
              <div class="answer-item-text">
                <span>{{ option.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Recommended Opening Section -->
      <div class="results-container" v-else>
        <div>
          <ChessBoardComponent
            :moves="convertedMoves"
            :openingFor="openingDetails?.openingFor"
            :openingName="openingDetails.Name"
          />
        </div>
        <!-- <h2>Your Recommended Opening for {{ openingDetails.openingFor }}</h2>
        <div v-if="openingDetails">
          <p><strong>Opening Name:</strong> {{ openingDetails.Name }}</p>
          <p><strong>FEN:</strong> {{ openingDetails.FEN }}</p>
          <p><strong>Moves:</strong> {{ openingDetails.Moves }}</p>
        </div>
        <div v-else>
          <p>No matching opening found.</p>
        </div> -->
      </div>
    </div>

    <!-- Show Chessboard Component Only After Completing Quiz -->
    <!-- <div v-if="currentQuestionIndex >= questions.length">
      <ChessBoardComponent
        :moves="convertedMoves"
        :openingFor="openingDetails?.openingFor"
      />
    </div> -->

    <!-- Debugging Section to Display Selected Answers and Result -->
    <!-- <div class="debug-section">
      <h2>Debug Information</h2>
      <p><strong>Selected Answers:</strong> {{ selectedAnswers }}</p>
      <p><strong>Computed Key:</strong> {{ selectedAnswers.join(" - ") }}</p>
      <p><strong>ECO Code:</strong> {{ resultEcoCode }}</p>
      <p><strong>Opening Details:</strong> {{ openingDetails }}</p>
    </div> -->
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

      // Retrieve the opening details from eco-codes.json using ecoCode
      const openingDetails = this.ecoCodes[ecoCode] || null;

      // If openingDetails are found, combine them with the 'openingFor' from results.json
      if (openingDetails && ecoCode) {
        const result = results[this.selectedAnswers.join(" - ").toLowerCase()];
        const openingFor = result ? result.openingFor : "Unknown";
        console.log("opening for", openingFor);
        return {
          ...openingDetails,
          openingFor: openingFor || "Unknown",
        };
      } else {
        console.log("No matching opening found for ECO Code:", ecoCode);
        return null;
      }
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
        { text: "Attacking. I love to be aggressive!", value: "attacking" },
        {
          text: "Counter-attacking. I like to wait for a mistake and then fight.",
          value: "counter-attacking",
        },
        { text: "Balanced. I believe in good moves.", value: "balanced" },
        {
          text: "Positional. I like strategic maneuvering.",
          value: "positional",
        },
        { text: "Trading. I like to win in the endgame.", value: "trading" },
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
  padding: 58px 0;
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
  background: #4caf50; /* Green or any color you want to indicate completion */
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
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
}

.question-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 45px;
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
  gap: 21px;
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
  gap: 10px;
}

.answer-item-text span:nth-child(1) {
  color: #fff;
  font-family: "Chess Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
}

.debug-section {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}
</style>
