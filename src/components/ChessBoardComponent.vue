<template>
  <div class="chessboard-component">
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
    <div class="notation-wrapper">
      <div class="vertical-move-list scroll-container"></div>
      <div class="controls">
        <button @click="toStartPostition" :disabled="currMove === 0">
          Start
        </button>
        <button @click="prevMove" :disabled="currMove === 0">Prev</button>
        <button @click="nextMove" :disabled="currMove >= moves.length">
          Next
        </button>
        <button @click="toEndPostition" :disabled="currMove >= moves.length">
          End
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

    const plugin = createVerticalMoveListPlugin({
      displayTimeInClockFormat: false,
      el: document.querySelector(".vertical-move-list"),
    });
    this.game.plugins.add(plugin);
  },
  methods: {
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
</script>

<style>
.chessboard-wrapper {
  position: relative;
}

.chessboard-component {
  display: flex;
  gap: 40px;
}

.controls {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  gap: 24px;
}

button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: #0b6112;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
