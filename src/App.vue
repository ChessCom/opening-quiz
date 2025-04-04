<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
  <footer>
    <div class="logo-container">
      <img
        src="assets/images/chesscom-logo.png"
        width="126"
        height="40"
        alt="chess.com logo"
      />
    </div>
    <nav>
      <a href="https://www.chess.com/about" target="_blank">About</a>
      <span>·</span>
      <a href="https://www.chess.com/legal/privacy" target="_blank">Privacy</a>
      <span>·</span>
      <a
        href="https://www.chess.com/article/view/digital-services-act-compliance?expose=0"
        target="_blank"
        >Compliance</a
      >
      <span>·</span>
      <a href="" target="_blank">Chess.com © {{ currentYear }}</a>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      quizStarted: false,
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    startQuiz() {
      this.quizStarted = true;
    },
  },
  mounted() {
    preloadImages([
      "/assets/images/arrow-spin-undo.svg",
      "/assets/images/bubble-part.svg",
      "/assets/images/chess_board.jpg",
      "/assets/images/chesscom-logo.png",
      "/assets/images/chevron-end.svg",
      "/assets/images/chevron-left.svg",
      "/assets/images/chevron-right.svg",
      "/assets/images/chevron-start.svg",
      "/assets/images/coach.svg",
      "/assets/images/copy-share.svg",
      "/assets/images/green.jpg",
      "/assets/images/header-logo-desktop.svg",
      "/assets/images/li-share.svg",
      "/assets/images/magnifier.png",
      "/assets/images/open-book-icon.svg",
      "/assets/images/open-book.svg",
      "/assets/images/opening-book-mob.svg",
      "/assets/images/opening-book.svg",
      "/assets/images/playwhite.svg",
      "/assets/images/plus.svg",
      "/assets/images/share.svg",
      "/assets/images/splash-header.svg",
      "/assets/images/tg-share.svg",
      "/assets/images/wa-share.svg",
      "/assets/images/x-share.svg",
      "/assets/images/answers/01-01.svg",
      "/assets/images/answers/01-02.svg",
      "/assets/images/answers/01-03.svg",
      "/assets/images/answers/02-01.svg",
      "/assets/images/answers/02-02.svg",
      "/assets/images/answers/02-03.svg",
      "/assets/images/answers/03-01.svg",
      "/assets/images/answers/03-02.svg",
      "/assets/images/answers/03-03.svg",
      "/assets/images/answers/03-04.svg",
      "/assets/images/answers/04-01.svg",
      "/assets/images/answers/04-02.svg",
      "/assets/images/answers/04-03.svg",
      "/assets/images/answers/04-04.svg",
      "/assets/images/answers/04-05.svg",
      "/assets/images/answers/05-01.svg",
      "/assets/images/answers/05-02.svg",
      "/assets/images/answers/05-03.svg",
      "/assets/images/answers/05-04.svg",
      "/assets/images/answers/05-05.svg",
      "/assets/images/answers/06-01.svg",
      "/assets/images/answers/06-02.svg",
      "/assets/images/answers/06-03.svg",
      "/assets/images/answers/06-04.svg",
      "/assets/images/answers/07-01.svg",
      "/assets/images/answers/07-02.svg",
      "/assets/images/answers/07-03.svg",
      "/assets/images/answers/07-04.svg",
      "/assets/images/questions/Q1.jpg",
      "/assets/images/questions/Q2.jpg",
      "/assets/images/questions/Q3 - Black.jpg",
      "/assets/images/questions/Q3 - White.jpg",
      "/assets/images/questions/Q4 - White - d4.jpg",
      "/assets/images/questions/Q4 - White - e4.jpg",
      "/assets/images/questions/Q5.jpg",
      "/assets/images/questions/Q6.gif",
      "/assets/images/questions/Q7.gif",
    ]);
  },
};

const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #262421;
  scroll-behavior: smooth;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

#app {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}

.primary-btn {
  color: #fff;
  font-family: "Chess Sans";
  text-align: center;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  font-size: 22px;
  font-style: normal;
  font-weight: 800;
  line-height: 28px; /* 127.273% */
  padding: 16px 31px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(180deg, #81b64c 0%, #5d9948 100%);
  box-shadow: 0px 1px 0px 0px rgba(178, 224, 104, 0.4) inset,
    0px -1px 0px 0px #45753c inset,
    0px 2px 4px 0px rgba(178, 224, 104, 0.5) inset,
    0px -2px 4px 0px rgba(69, 117, 60, 0.5) inset,
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  border: none;
}

.primary-btn:hover {
  background: linear-gradient(
      180deg,
      rgba(178, 224, 104, 0.5) 0%,
      rgba(178, 224, 104, 0) 100%
    ),
    linear-gradient(180deg, #81b64c 0%, #5d9948 100%);
  box-shadow: 0px 1px 0px 0px rgba(216, 250, 157, 0.4) inset,
    0px 2px 4px 0px rgba(216, 250, 157, 0.5) inset,
    0px -1px 0px 0px #45753c inset,
    0px -2px 4px 0px rgba(69, 117, 60, 0.5) inset,
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.primary-btn:active {
  background: linear-gradient(180deg, #81b64c 0%, #45753c 100%);
  box-shadow: 0px -1px 0px 0px rgba(129, 182, 76, 0.4) inset,
    0px -2px 4px 0px rgba(129, 182, 76, 0.5) inset,
    0px -1px 0px 0px #45753c inset,
    0px -2px 4px 0px rgba(69, 117, 60, 0.5) inset,
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.primary-btn:focus {
  background: linear-gradient(
      180deg,
      rgba(178, 224, 104, 0.5) 0%,
      rgba(178, 224, 104, 0) 100%
    ),
    linear-gradient(180deg, #81b64c 0%, #5d9948 100%);
  box-shadow: 0px 0px 0px 3px #0069ab inset,
    0px 1px 0px 0px rgba(178, 224, 104, 0.4) inset,
    0px -1px 0px 0px #45753c inset,
    0px 2px 4px 0px rgba(178, 224, 104, 0.5) inset,
    0px -2px 4px 0px rgba(69, 117, 60, 0.5) inset,
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.secondary-btn {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  font-family: "Chess Sans";
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 117.647% */
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset,
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(25px);
  border: none;
}

.secondary-btn:hover {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.14) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.14) inset,
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(25px);
}

.secondary-btn:active {
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.14) 0%,
      rgba(255, 255, 255, 0.02)
    )
    100%;
  box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.1) inset,
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(25px);
}

.secondary-btn:focus {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1)) 0%,
    rgba(255, 255, 255, 0.05) 100%;
  box-shadow: 0px 0px 0px 3px #008cd1 inset,
    0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset,
    0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(25px);
}

.secondary-btn img {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-width: 48px;
}

footer {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 12px 24px;
}

footer nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

footer nav a,
footer nav span {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
}

footer nav a,
footer nav a:visited,
footer nav a:hover {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5) ß;
  cursor: pointer;
}

@media only screen and (max-width: 1132px) {
  .quiz-container {
    padding: 0 16px;
  }
}

@media only screen and (max-width: 768px) {
  .secondary-btn img {
    width: 62px;
    height: 62px;
    min-width: 62px;
    min-width: 62px;
  }
  footer {
    padding: 40px 16px 24px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
