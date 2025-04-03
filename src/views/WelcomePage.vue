<template>
  <div class="header-logo mobile-img">
    <img
      src="assets/images/header-logo-desktop.svg"
      width="230"
      height="55"
      alt="Opening quiz header"
    />
  </div>
  <div class="welcome-page">
    <div class="welcome-text">
      <div class="welcome-text-content">
        <div class="header-logo desktop-img">
          <img
            src="assets/images/splash-header.svg"
            width="406"
            height="94"
            alt="Opening quiz header"
          />
        </div>
        <div class="bubble-wrapper">
          <div class="coach">
            <img src="assets/images/coach.svg" height="44" width="44" alt="coach"/>
          </div>
          <div class="bubble-text">
            <img src="assets/images/bubble-part.svg" height="15" width="10" class="bubble-part"/>
            <p>Find your next chess opening</p>
          </div>
        </div>
        <button class="primary-btn" @click="startQuiz">
          <img
            src="assets/images/magnifier.png"
            width="32"
            height="32"
            alt="magnifier"
          />
          <span>Start the Quiz</span>
        </button>
      </div>
    </div>
    <div class="welcome-image">
      <img
        src="assets/images/open-book.svg"
        alt="openings book"
        class="desktop-img"
      />
      <img
        src="assets/images/open-book.svg"
        alt="openings book"
        class="mobile-img"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startQuiz() {
      this.$router.push("/quiz");
    },
  },
};
</script>

<style scoped>
.header-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-page {
  position: relative;
  display: flex;
  margin-left: auto;
  width: 100vw;
  overflow-x: hidden;
  gap: 40px;
}

.welcome-text {
  display: flex;
  max-width: 486px;
  width: 100%;
  padding-top: 215px;
  padding-bottom: 177px;
  min-width: 40%;
  padding-left: 170px;
}

.welcome-text-content {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 406px;
  max-width: 100%;
}

.welcome-text img {
  max-width: 100%;
}

.welcome-text .primary-btn{
  width: 100%;
}

.welcome-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  flex-grow: 1;
  overflow: visible; /* Allow overflow outside the div */
}

.welcome-image img {
  position: absolute;
  left: 0;
  object-fit: contain;
}

.bubble-text p {
  color:  #312E2B;
  font-family: "Chess Sans";
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 127.273% */
  width: 100%;
}

.bubble-wrapper {
  display: flex;
  gap: 20px;
  margin: 40px 0 24px;
  width: 100%;
  align-items: end;
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

.bubble-text {
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.95);
  padding: 16px;
  position: relative;
}

.mobile-img {
  display: none;
}

@media only screen and (max-width: 1380px) {
  .welcome-text {
    padding-left: 50px;
  }
}

@media only screen and (max-width: 1050px) {
  .welcome-image img {
    overflow: hidden;
  }
}

@media only screen and (max-width: 1024px) {
  .bubble-text p {
    color: #312E2B;
    font-family: "Chess Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; /* 127.273% */
  }
}

@media only screen and (max-width: 640px) {
  .desktop-img {
    display: none;
  }

  .mobile-img {
    display: block;
  }

  .welcome-page {
    flex-direction: column-reverse;
  }

  .welcome-text {
    position: sticky;
    bottom: 0;
    z-index: 100000;
    backdrop-filter: blur(10px);
    padding: 24px 16px;
    align-items: center;
    gap: 12px;
    min-width: unset;
    max-width: 100%;
    width: 100%;
  }

  .welcome-text-content {
    min-width: unset;
    max-width: 100%;
    width: 100%;
    gap: 12px;
  }

  .bubble-wrapper {
    margin: 4px 0 0 0;
  }

  .header-logo.mobile-img {
    padding: 52px 40px 35px;
    display: flex;
    align-items: center;
  }

  .welcome-image img {
    overflow: visible;
    position: relative;
    width: 120%;
  }

  .welcome-image {
    width: 100%;
    overflow: visible; /* Allow overflow outside the div */
  }

  .bubble-text p {
    color: #312E2B;
    font-family: "Chess Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; /* 127.273% */
  }

  .welcome-text .primary-btn {
    width: 100%;
  }

  footer nav {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
