<!-- <template>
  <div id="app">
    <OpeningQuiz />
  </div>
</template>

<script>
import OpeningQuiz from './components/OpeningQuiz.vue';

export default {
  name: 'App',
  components: {
    OpeningQuiz
  }
};
</script> -->

<template>
  <WelcomePage v-if="!quizStarted" @startQuiz="startQuiz" />
  <OpeningQuiz v-else />
  <footer>
    <div class="logo-container">
      <img
        src="/assets/images/chesscom-logo.png"
        width="126"
        height="40"
        alt="chess.com logo"
      />
    </div>
    <nav>
      <a href="" target="_blank">About</a>
      <span>·</span>
      <a href="" target="_blank">Privacy</a>
      <span>·</span>
      <a href="" target="_blank">Compliance</a>
      <span>·</span>
      <a href="" target="_blank">Chess.com © {{ currentYear }}</a>
    </nav>
  </footer>
</template>

<script>
import WelcomePage from "./components/WelcomePage.vue";
import OpeningQuiz from "./components/OpeningQuiz.vue";

export default {
  name: "App",
  components: {
    WelcomePage,
    OpeningQuiz,
  },
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
  border: 1px solid #fff;
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
  border: 1px solid #fff;
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

@media only screen and (max-width: 640px) {
  .secondary-btn img {
    width: 62px;
    height: 62px;
    min-width: 62px;
    min-width: 62px;
  }
}
</style>
