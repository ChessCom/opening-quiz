<template>
  <div class="chessboard-component">
    <div class="recommended-opening mobile">
      <span>We recommend to play</span>
      <div class="opening-name">{{ openingName }}</div>
    </div>
    <div class="chessboard-wrapper">
      <div
        id="chessboard"
        style="
          position: relative;
          background-size: 100%;
          display: block;
          height: 0;
          padding-bottom: 100%;
        "
      ></div>
    </div>
    <div class="results-content">
      <div class="recommended-opening desktop">
        <span>We recommend to play</span>
        <div class="opening-name">{{ openingName }}</div>
      </div>
      <div
        v-if="!showControls"
        class="show-controls mobile"
        @click="showControls = true"
      >
        <img
          src="/assets/images/plus.svg"
          width="16"
          height="16"
          alt="show controls"
        />
        <span>Show Move Controls</span>
      </div>
      <div :class="['notation-wrapper', { 'mobile-show': showControls }]">
        <div class="vertical-move-list scroll-container"></div>
        <div class="board-controls">
          <button @click="toStartPostition" :disabled="currMove === 0">
            <img
              src="/assets/images/chevron-start.svg"
              width="28"
              height="28"
              alt="to start position"
            />
          </button>
          <button @click="prevMove" :disabled="currMove === 0">
            <img
              src="/assets/images/chevron-left.svg"
              width="28"
              height="28"
              alt="previous move"
            />
          </button>
          <button @click="nextMove" :disabled="currMove >= moves.length">
            <img
              src="/assets/images/chevron-right.svg"
              width="28"
              height="28"
              alt="next move"
            />
          </button>
          <button @click="toEndPostition" :disabled="currMove >= moves.length">
            <img
              src="/assets/images/chevron-end.svg"
              width="28"
              height="28"
              alt="to end of the line"
            />
          </button>
        </div>
      </div>
      <div class="learn-opening">
        <span>Learn this opening on chesscom courses</span>
        <a v-if="isChessable" class="course-card" :href="courseLink">
          <div class="course-img">
            <img :src="chessableCourseCover" width="65" height="65" alt="" />
          </div>
          <div class="course-info">
            <div class="title">
              {{ chessableCourseTitle }}
            </div>
            <div class="author">{{ chessableCourseAuthor }}</div>
          </div>
        </a>
        <div v-if="isChessCom" class="lesson-card">
          <div class="title">Learn The Scandinavian Defense</div>
          <div class="author">Chess.com Lesson</div>
        </div>
        <a class="secondary-btn" :href="courseLink">
          <img
            src="/assets/images/chess-coach.svg"
            width="48"
            height="48"
            alt="Chess Coach image"
          />
          <span>Learn The Scandinavian Defense</span>
        </a>
      </div>
      <div class="action-btn-container">
        <a class="secondary-btn" href="https://www.chess.com/play/online">
          <img
            src="/assets/images/playwhite.svg"
            width="24"
            height="24"
            alt="hand and pawn"
          />
          <span>Play a Game</span>
        </a>
        <button class="secondary-btn">
          <img
            src="/assets/images/share.svg"
            width="24"
            height="24"
            alt="hand and pawn"
          />
          <span>Share Result</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Modes,
  createGame,
  createVerticalMoveListPlugin,
} from "@chesscom/chessboard";
import "@chesscom/chessboard/dist/chessboard/chessboard.css";

export default {
  name: "ChessBoardComponent",
  props: {
    moves: {
      type: Array,
      default: () => [],
    },
    openingFor: {
      type: String,
      required: true,
    },
    openingName: {
      type: String,
      required: true,
    },
    courseLink: {
      type: String,
      required: true,
    },
    chessableCourseCover: {
      type: String,
      required: false,
      default: "",
    },
    chessableCourseTitle: {
      type: String,
      required: false,
      default: "",
    },
    chessableCourseAuthor: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      game: null,
      currMove: 0,
      showControls: false,
    };
  },
  computed: {
    isChessable() {
      return this.courseLink.includes("chessable");
    },
    isChessCom() {
      return this.courseLink.includes("chess.com");
    },
  },
  mounted() {
    const el = document.getElementById("chessboard");
    this.game = createGame({
      el,
      mode: {
        modeType: Modes.Types.Observing,
        options: {
          canInteractWithPieces: false,
        },
      },
    });
    this.game.load({ moves: this.moves });
    this.currMove = this.moves.length;
    this.setBoardOrientation(this.openingFor);
    const plugin = createVerticalMoveListPlugin({
      displayTimeInClockFormat: false,
      el: document.querySelector(".vertical-move-list"),
    });
    this.game.plugins.add(plugin);
  },
  watch: {
    openingFor(newValue) {
      this.setBoardOrientation(newValue);
    },
  },
  methods: {
    setBoardOrientation(openingFor) {
      this.game.setOptions({ flipped: openingFor === "Black" });
    },
    nextMove() {
      if (this.currMove < this.moves.length) {
        this.game.moveForward();
        this.currMove++;
      }
    },
    prevMove() {
      if (this.currMove > 0) {
        this.game.moveBackward();
        this.currMove--;
      }
    },
    toStartPostition() {
      this.game.selectNode(0, -1);
      this.currMove = 0;
    },
    toEndPostition() {
      this.game.selectNode(0, this.moves.length - 1);
      this.currMove = this.moves.length;
    },
  },
  beforeUnmount() {
    if (this.game) this.game.destroy();
  },
};
</script>

<!-- <script>
import {
  Modes,
  createGame,
  createVerticalMoveListPlugin,
} from "@chesscom/chessboard";
import "@chesscom/chessboard/dist/chessboard/chessboard.css";

export default {
  name: "ChessBoardComponent",
  props: {
    moves: {
      type: Array,
      default: () => [],
    },
    openingFor: {
      type: String,
      required: true,
    },
    openingName: {
      type: String,
      required: true,
    },
    courseLink: {
      type: String,
      required: true,
    },
    chessableCourseCover: {
      type: String,
      required: true,
    },
    chessableCourseTitle: {
      type: String,
      required: true,
    },
    chessableCourseAuthor: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      game: null,
      currMove: 0,
    };
  },
  mounted() {
    const el = document.getElementById("chessboard");
    this.game = createGame({
      el,
      mode: {
        modeType: Modes.Types.Observing,
        options: {
          canInteractWithPieces: false,
        },
      },
    });
    this.game.load({ moves: this.moves });
    this.currMove = this.moves.length;
    this.setBoardOrientation(this.openingFor);
    const plugin = createVerticalMoveListPlugin({
      displayTimeInClockFormat: false,
      el: document.querySelector(".vertical-move-list"),
    });
    this.game.plugins.add(plugin);
  },
  watch: {
    openingFor(newValue) {
      this.setBoardOrientation(newValue);
    },
  },
  methods: {
    setBoardOrientation(openingFor) {
      if (openingFor === "Black") {
        this.game.setOptions({ flipped: true });
      } else {
        this.game.setOptions({ flipped: false });
      }
    },
    nextMove() {
      if (this.currMove < this.moves.length) {
        this.game.moveForward();
        this.currMove++;
      }
    },
    prevMove() {
      if (this.currMove > 0) {
        this.game.moveBackward();
        this.currMove--;
      }
    },
    toStartPostition() {
      this.game.selectNode(0, -1);
      this.currMove = 0;
    },
    toEndPostition() {
      const positionAfterLastMove = this.moves.length - 1;
      this.game.selectNode(0, positionAfterLastMove);
      this.currMove = this.moves.length;
    },
  },
  beforeUnmount() {
    if (this.game) this.game.destroy();
  },
};
</script> -->

<style>
.chessboard-wrapper {
  position: relative;
  width: 512px;
  height: 512px;
}
.chessboard-component {
  display: flex;
  gap: 70px;
}

.results-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.recommended-opening {
  display: flex;
  gap: 4px;
  flex-direction: column;
}

.recommended-opening span {
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.recommended-opening .opening-name {
  color: #fff;
  font-family: "Chess Sans";
  font-size: 31px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; /* 116.129% */
}

.learn-opening {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.learn-opening > span {
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.course-card {
  display: flex;
  gap: 15px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  padding: 12px;
  cursor: pointer;
  text-decoration: none;
}

.course-img {
  min-width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
}

.course-img img {
  width: 65px;
  min-width: 65px;
  height: 65px;
  min-width: 65px;
}

.course-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
}

.title {
  color: rgba(255, 255, 255, 0.85);
  font-family: "Chess Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 21.6px */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 114.286% */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  padding: 12px;
}

.learn-opening button span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-btn-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn-container button {
  flex-grow: 1;
  min-width: max-content;
}

.board-controls {
  display: flex;
  gap: 8px;
  margin-top: 24px;
  width: 100%;
}

.board-controls button {
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.1) inset;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  width: 25%;
}

.vertical-move-list div.move:nth-child(odd) {
  background: rgba(255, 255, 255, 0.02);
}

.vertical-move-list {
  color: rgba(255, 255, 255, 0.5);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.vertical-move-list .move .node {
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 123.077% */
}

.vertical-move-list .white,
.vertical-move-list .black {
  height: 18px;
  top: 6px;
  display: flex;
  align-items: center;
  min-width: max-content;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.vertical-move-list .white.selected,
.vertical-move-list .black.selected {
  background: rgba(255, 255, 255, 0.14);
  border-radius: 2px;
}

.learn-opening .secondary-btn {
  justify-content: start;
}

.show-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 0;
}

.show-controls span {
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 114.286% */
}

.action-btn-container {
  flex-direction: column;
}

.action-btn-container .secondary-btn img {
  width: 24px;
  height: 24px;
  min-height: 24px;
  min-width: 24px;
}

.notation-wrapper {
  display: block;
}

.mobile {
  display: none;
}

@media only screen and (max-width: 860px) {
  .chessboard-wrapper,
  .results-content {
    width: 50%;
  }
}

@media only screen and (max-width: 640px) {
  .desktop {
    display: none;
  }

  .show-controls.mobile {
    display: flex;
  }

  .chessboard-component {
    flex-direction: column;
  }

  .chessboard-wrapper,
  .results-content {
    width: 100%;
    height: max-content;
  }

  .results-content {
    gap: 24px;
  }

  .chessboard-component {
    gap: 0px;
  }

  .recommended-opening.mobile {
    margin-bottom: 24px;
    display: flex;
  }

  .notation-wrapper {
    margin-top: 24px;
  }

  .recommended-opening.mobile .opening-name {
    color: #fff;
    font-family: "Chess Sans";
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px; /* 114.286% */
  }
  .notation-wrapper {
    display: none;
  }

  .notation-wrapper.mobile-show {
    display: block;
  }
}
</style>
