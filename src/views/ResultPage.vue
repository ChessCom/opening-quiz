<template>
  <div class="quiz-container">
    <LottieAnimation
      v-if="showConfetti"
      animationPath="assets/animations/confetti-colors.json"
      :loop="false"
      @animationComplete="showConfetti = false"
      class="confetti-overlay"
    />
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
            completed: true,
          }"
        ></div>
      </div>
    </div>

    <div class="chessboard-component">
      <div class="recommended-opening-wrapper mobile">
        <div class="coach">
          <img
            src="assets/images/coach.svg"
            width="44"
            height="44"
            alt="coach"
          />
        </div>
        <div class="recommended-opening">
          <img
            src="assets/images/bubble-part.svg"
            height="15"
            width="10"
            class="bubble-part"
          />
          <span>You should try...</span>
          <div class="opening-name">{{ openingName }}</div>
        </div>
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
        <div class="recommended-opening-wrapper desktop">
          <div class="coach">
            <img
              src="assets/images/coach.svg"
              width="44"
              height="44"
              alt="coach"
            />
          </div>
          <div class="recommended-opening">
            <img
              src="assets/images/bubble-part.svg"
              height="15"
              width="10"
              class="bubble-part"
            />
            <span>You should try...</span>
            <div class="opening-name">{{ openingName }}</div>
          </div>
        </div>
        <div
          v-if="!showControls"
          class="show-controls mobile"
          @click="showControls = true"
        >
          <img
            src="assets/images/plus.svg"
            width="16"
            height="16"
            alt="show controls"
          />
          <span>Show Move Controls</span>
        </div>
        <div
          :class="[
            'notation-wrapper',
            { 'mobile-show': showControls },
            'dark-mode',
          ]"
        >
          <div class="move-list"></div>
          <div class="board-controls">
            <button @click="toStartPostition">
              <img
                src="assets/images/chevron-start.svg"
                width="28"
                height="28"
                alt="to start position"
              />
            </button>
            <button @click="prevMove">
              <img
                src="assets/images/chevron-left.svg"
                width="28"
                height="28"
                alt="previous move"
              />
            </button>
            <button @click="nextMove">
              <img
                src="assets/images/chevron-right.svg"
                width="28"
                height="28"
                alt="next move"
              />
            </button>
            <button @click="toEndPostition">
              <img
                src="assets/images/chevron-end.svg"
                width="28"
                height="28"
                alt="to end of the line"
              />
            </button>
          </div>
        </div>
        <div class="learn-opening">
          <span v-if="isChessable">Learn this opening with Chessable</span>
          <span v-if="isChessCom"
            >Practice this opening with a chess.com Lesson</span
          >
          <a
            v-if="isChessable"
            class="course-card"
            :href="courseLink"
            target="_blank"
          >
            <div class="course-img">
              <img :src="chessableCourseCover" width="65" height="65" alt="" />
            </div>
            <div class="course-info">
              <div class="title">{{ chessableCourseTitle }}</div>
              <div class="author">{{ chessableCourseAuthor }}</div>
            </div>
          </a>
          <a
            v-if="isChessCom"
            class="lesson-card"
            :href="courseLink"
            target="_blank"
          >
            <img
              src="assets/images/open-book-icon.svg"
              width="48"
              height="48"
              alt="Chess Coach image"
            />
            <div class="lesson-info">
              <div class="title">Learn the {{ openingName }}</div>
              <div class="author">Chess.com Lesson</div>
            </div>
          </a>
        </div>
        <div class="action-btn-wrapper">
          <div class="action-btn-container">
            <a class="secondary-btn" href="/quiz">
              <img
                src="assets/images/arrow-spin-undo.svg"
                width="24"
                height="24"
                alt="hand and pawn"
              />
              <span>Go Again</span>
            </a>
            <button class="secondary-btn" @click="showShareContainer">
              <img
                src="assets/images/share.svg"
                width="24"
                height="24"
                alt="hand and pawn"
              />
              <span>Share Result</span>
            </button>
          </div>
          <div v-if="isShareContainerVisible" class="share-container">
            <div class="share-item" @click="shareOnTwitter">
              <img src="assets/images/x-share.svg" alt="X Share" />
            </div>
            <div class="share-item">
              <a
                :href="
                  'https://www.linkedin.com/shareArticle?mini=true&url=' +
                  encodeURIComponent(courseLink) +
                  '&title=Check out my recommended opening!'
                "
                target="_blank"
              >
                <img src="assets/images/li-share.svg" alt="LinkedIn Share" />
              </a>
            </div>
            <div class="share-item" @click="shareOnFacebook">
              <img src="assets/images/fb-share.svg" alt="" />
            </div>
            <div class="share-item" @click="shareOnWhatsApp">
              <img src="assets/images/wa-share.svg" alt="" />
            </div>
            <div class="share-item" @click="copyToClipboard">
              <div class="copied-popup">copied</div>
              <img src="assets/images/copy-share.svg" alt="Copy Link" />
            </div>
            <div class="share-item" @click="shareOnTelegram">
              <img src="assets/images/tg-share.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modes, createGame, createMoveListPlugin } from "@chesscom/chessboard";
import "@chesscom/chessboard/dist/chessboard/chessboard.css";
import "@chesscom/design-system/dist/variables.css";
import results from "@/data/results.json";
import ecoCodes from "@/data/eco-codes.json";
import LottieAnimation from "@/components/LottieAnimation.vue";

export default {
  name: "ResultPage",
  components: {
    LottieAnimation,
  },
  data() {
    return {
      game: null,
      currMove: 0,
      showControls: false,
      isShareContainerVisible: false,
      ecoCodes: ecoCodes,
      showConfetti: true,
    };
  },
  computed: {
    ecoCode() {
      return this.$route.query.ecoCode;
    },
    openingDetails() {
      const ecoCode = this.ecoCode;
      if (!ecoCode || !this.ecoCodes[ecoCode]) {
        console.log("No matching opening found for ECO Code:", ecoCode);
        return null;
      }

      // Find the result that matches this ECO code
      const matchingResult = Object.entries(results).find(
        ([, value]) => value.ecoCode === ecoCode
      );
      const result = matchingResult ? matchingResult[1] : {};

      return {
        ...this.ecoCodes[ecoCode],
        openingFor:
          result.openingFor || this.ecoCodes[ecoCode].openingFor || "Unknown",
        courseLink:
          result.courseLink || this.ecoCodes[ecoCode].courseLink || "",
        chessableCourseCover:
          result.chessableCourseCover ||
          this.ecoCodes[ecoCode].chessableCourseCover ||
          "",
        chessableCourseTitle:
          result.chessableCourseTitle ||
          this.ecoCodes[ecoCode].chessableCourseTitle ||
          "",
        chessableCourseAuthor:
          result.chessableCourseAuthor ||
          this.ecoCodes[ecoCode].chessableCourseAuthor ||
          "",
      };
    },
    moves() {
      if (this.openingDetails && this.openingDetails.Moves) {
        return this.convertMovesToArray(this.openingDetails.Moves);
      }
      return [];
    },
    openingName() {
      return this.openingDetails?.Name || "Unknown Opening";
    },
    openingFor() {
      return this.openingDetails?.openingFor || "Unknown";
    },
    courseLink() {
      return this.openingDetails?.courseLink || "";
    },
    chessableCourseCover() {
      return this.openingDetails?.chessableCourseCover || "";
    },
    chessableCourseTitle() {
      return this.openingDetails?.chessableCourseTitle || "";
    },
    chessableCourseAuthor() {
      return this.openingDetails?.chessableCourseAuthor || "";
    },
    isChessable() {
      return this.courseLink && this.courseLink.includes("chessable");
    },
    isChessCom() {
      return this.courseLink && this.courseLink.includes("chess.com");
    },
    currentUrl() {
      if (typeof window !== "undefined") {
        return window.location.href;
      }
      return "";
    },
  },
  methods: {
    convertMovesToArray(movesString) {
      if (!movesString) return [];
      const sanitizedString = movesString.replace(/\d+\./g, "").trim();
      return sanitizedString.split(/\s+/);
    },
    setBoardOrientation(openingFor) {
      this.game.setOptions({ flipped: openingFor === "Black" });
    },
    nextMove() {
      this.game.moveForward();
    },
    prevMove() {
      this.game.moveBackward();
    },
    toStartPostition() {
      this.game.selectNode(0, -1);
    },
    toEndPostition() {
      this.game.selectNode(0, this.moves.length - 1);
    },
    showShareContainer() {
      this.isShareContainerVisible = !this.isShareContainerVisible; // Toggle visibility
      console.log("Share button clicked!"); // Log for debugging
    },
    shareOnTwitter() {
      const url = window.location.href;
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          "Check out my recommended opening!"
        )}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    },
    shareOnFacebook() {
      const url = window.location.href;
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&hashtag=${encodeURIComponent("Check out my recommended opening!")}`,
        "_blank"
      );
    },
    shareOnWhatsApp() {
      const url = window.location.href;
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(
          "Check out my recommended opening! " + url
        )}`,
        "_blank"
      );
    },
    shareOnTelegram() {
      const url = window.location.href;
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent("Check out my recommended opening!")}`,
        "_blank"
      );
    },
    copyToClipboard() {
      if (typeof window !== "undefined") {
        navigator.clipboard.writeText(this.currentUrl).then(() => {
          console.log("URL copied to clipboard");
          const popup = document.querySelector(".copied-popup");
          if (popup) {
            popup.classList.add("show");
          }
        });
      }
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

    // Set initial board orientation after game is loaded
    if (this.game) {
      this.setBoardOrientation(this.openingFor);
    }

    const plugin = createMoveListPlugin({
      displayTimeInClockFormat: false,
      target: document.querySelector(".move-list"),
    });
    this.game.plugins.add(plugin);
    this.game["move-list"].getMoveList().setAnalysisHidden(true);
    this.game["move-list"].getMoveList().setContextMenuEnabled(false);
  },
  beforeUnmount() {
    if (this.game) this.game.destroy();
  },
};
</script>

<style>
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

.progress-bar-container {
  margin-bottom: 41px;
}

.progress-bar {
  display: flex;
  gap: 2px;
}

.progress-bar > :first-child {
  border-radius: 4px 0px 0px 4px;
}

.progress-bar > :nth-child(7) {
  border-radius: 0px 4px 4px 0px;
}

.progress-bar-item {
  border-radius: 0px;
  background: rgba(255, 255, 255, 0.05);
  height: 12px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.progress-bar-item.completed {
  background: #81b64c;
}

.chessboard-wrapper {
  position: relative;
  width: 512px;
  height: 512px;
  border-radius: 5px;
  overflow: hidden;
  min-width: 512px;
}
.chessboard-component {
  display: flex;
  gap: 70px;
}

.results-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;
}

.recommended-opening {
  display: flex;
  gap: 8px;
  flex-direction: column;
  padding: 16px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  position: relative;
}

.recommended-opening span {
  color: rgba(49, 46, 43, 0.72);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.recommended-opening-wrapper .opening-name {
  color: #312e2b;
  font-family: "Chess Sans";
  font-size: 28px;
  font-weight: 600;
  line-height: 32px;
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
  padding: 12px;
  cursor: pointer;
  text-decoration: none;
  background: var(
    --Button-Monetize-color-fill-enabled-monetize,
    linear-gradient(
      180deg,
      var(--color-blue-300, #008cd1) 0%,
      var(--color-blue-400, #0069ab) 100%
    )
  );
  /* Button/Monetize/button-monetize-enabled */
  box-shadow: 0px 1px 0px 0px rgba(77, 195, 234, 0.4) inset,
    0px -1px 0px 0px var(--color-blue-500, #0b548c) inset,
    0px 2px 4px 0px rgba(0, 159, 217, 0.5) inset,
    0px -2px 4px 0px rgba(11, 84, 140, 0.5) inset,
    0px 1px 2px 0px var(--color-transparent-black-14, rgba(0, 0, 0, 0.14)),
    0px 2px 4px 0px var(--color-transparent-black-10, rgba(0, 0, 0, 0.1));
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

.course-info,
.lesson-info {
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
  line-clamp: 2;
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
  text-decoration: none;
  gap: 4px;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  background: var(
    --Button-Monetize-color-fill-enabled-monetize,
    linear-gradient(180deg, #008cd1 0%, #0069ab 100%)
  );

  box-shadow: 0px 1px 0px 0px rgba(77, 195, 234, 0.4) inset,
    0px -1px 0px 0px var(--color-blue-500, #0b548c) inset,
    0px 2px 4px 0px rgba(0, 159, 217, 0.5) inset,
    0px -2px 4px 0px rgba(11, 84, 140, 0.5) inset,
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.lesson-card:hover,
.course-card:hover {
  background: var(
    --Button-Monetize-color-fill-enabled-monetize,
    linear-gradient(180deg, #008cd1 0%, #0069ab 100%)
  );

  box-shadow: 0px -1px 0px 0px #083a66 inset,
    0px 1px 0px 0px rgba(178, 240, 255, 0.4) inset,
    0px -2px 4px 0px rgba(8, 58, 102, 0.5) inset,
    0px 2px 4px 0px rgba(206, 245, 255, 0.25) inset,
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.lesson-card img {
  min-width: 48px;
  width: 48px;
  min-height: 48px;
  height: 48px;
}

.learn-opening button span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-btn-container {
  display: flex;
  gap: 12px;
}

.action-btn-container button {
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

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  cursor: pointer;
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

.action-btn-container .secondary-btn img {
  width: 24px;
  height: 24px;
  min-height: 24px;
  min-width: 24px;
}

.learn-opening .secondary-btn span {
  text-align: start;
}

.action-btn-container .secondary-btn {
  width: 50%;
}

.notation-wrapper {
  display: block;
}

.recommended-opening-wrapper {
  display: flex;
  gap: 20px;
  align-items: end;
}

.bubble-part {
  position: absolute;
  left: -9px;
  bottom: 10px;
}

.action-btn-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.share-item {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.share-item:has(.copied-popup) {
  position: relative;
}

.copied-popup {
  display: none;
  position: absolute;
  top: -26px;
  padding: 4px 8px;
  color: #fff;
  font-family: "Chess Sans";
  font-size: 12px;
  font-weight: 600;
  line-height: 115%;
  border-radius: 3px;
  background: #008cd1;
}

.copied-popup.show {
  display: block;
}

.share-container {
  align-self: end;
  gap: 12px;
  width: max-content;
  display: flex;
  padding: 12px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background: var(
    --Button-Secondary-color-fill-focus-secondary,
    linear-gradient(
      180deg,
      var(
          --color-component-button-secondary-enabled-start,
          rgba(255, 255, 255, 0.1)
        )
        0%,
      var(
          --color-component-button-secondary-enabled-end,
          rgba(255, 255, 255, 0.05)
        )
        100%
    )
  );
  /* Button/Secondary/button-secondary-active */
  box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.1) inset,
    0px 1px 2px 0px var(--color-transparent-black-14, rgba(0, 0, 0, 0.14)),
    0px 2px 4px 0px var(--color-transparent-black-10, rgba(0, 0, 0, 0.1));
  backdrop-filter: blur(25px);
}

.mobile {
  display: none;
}

@media only screen and (max-width: 1024px) {
  .action-btn-container {
    flex-direction: column;
  }
  .action-btn-container .secondary-btn {
    width: 100%;
  }
  .chessboard-wrapper {
    min-width: unset;
    width: 50%;
  }

  .results-content {
    width: 50%;
  }
}

@media only screen and (max-width: 768px) {
  .desktop {
    display: none;
  }

  .show-controls.mobile {
    display: flex;
  }

  .chessboard-component {
    flex-direction: column;
  }

  .chessboard-wrapper {
    height: max-content;
    align-self: center;
  }
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

  .recommended-opening-wrapper.mobile {
    margin-bottom: 24px;
    display: flex;
  }

  .notation-wrapper {
    margin-top: 24px;
  }

  .recommended-opening-wrapper.mobile .opening-name {
    color: var(--color-text-speech, #312e2b);
    font-family: "Chess Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
  }
  .action-btn-container {
    flex-direction: column;
  }
  .notation-wrapper {
    display: none;
  }

  .notation-wrapper.mobile-show {
    display: block;
  }

  header {
    padding: 24px;
  }

  header > img {
    max-width: 155px;
  }

  .progress-bar-container {
    margin-bottom: 24px;
  }

  .progress-bar-item {
    height: 10px;
  }

  .share-container {
    width: 100%;
    justify-content: center;
  }
}

@media only screen and (max-width: 640px) {
  .chessboard-wrapper {
    width: 100%;
  }
}

/* Animations */
.confetti-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}
</style>
