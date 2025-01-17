<template>
  <div>
    <h1>Chess Opening Quiz!</h1>

    <!-- Quiz Questions Section -->
    <div v-if="currentQuestionIndex < questions.length">
      <h2>{{ questions[currentQuestionIndex].question }}</h2>
      <div v-if="currentQuestionIndex === 6">
        <div v-for="(option, index) in getPlayStyleOptions()" :key="index">
          <button @click="selectOption(option.value)">{{ option.text }}</button>
        </div>
      </div>
      <div v-else>
        <div
          v-for="(option, index) in questions[currentQuestionIndex].options"
          :key="index"
        >
          <button @click="selectOption(option.value)">{{ option.text }}</button>
        </div>
      </div>
    </div>

    <!-- Recommended Opening Section -->
    <div v-else>
      <h2>Your Recommended Opening for {{ openingDetails.openingFor }}</h2>
      <div v-if="openingDetails">
        <p><strong>Opening Name:</strong> {{ openingDetails.Name }}</p>
        <p><strong>FEN:</strong> {{ openingDetails.FEN }}</p>
        <p><strong>Moves:</strong> {{ openingDetails.Moves }}</p>
      </div>
      <div v-else>
        <p>No matching opening found.</p>
      </div>
    </div>

    <!-- Show Chessboard Component Only After Completing Quiz -->
    <div v-if="currentQuestionIndex >= questions.length">
      <ChessBoardComponent
        :moves="convertedMoves"
        :openingFor="openingDetails?.openingFor"
      />
    </div>

    <!-- Debugging Section to Display Selected Answers and Result -->
    <div class="debug-section">
      <h2>Debug Information</h2>
      <p><strong>Selected Answers:</strong> {{ selectedAnswers }}</p>
      <p><strong>Computed Key:</strong> {{ selectedAnswers.join(" - ") }}</p>
      <p><strong>ECO Code:</strong> {{ resultEcoCode }}</p>
      <p><strong>Opening Details:</strong> {{ openingDetails }}</p>
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
h1,
h2 {
  text-align: center;
}
button {
  display: block;
  margin: 10px auto;
}
.debug-section {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}
</style>
