<template>
  <div class="header-logo mobile-img">
    <img
      src="assets/images/mobile-header.svg"
      width="155"
      height="50"
      alt="Opening quiz header"
    />
  </div>
  <div class="welcome-page">
    <div class="welcome-image">
      <div class="header-logo desktop-img">
        <img
          src="assets/images/header-logo-desktop.svg"
          alt="Opening quiz header"
        />
      </div>
      <img
        src="assets/images/open-book-hero.svg"
        alt="openings book"
        class="desktop-img"
      />
      <img
        src="assets/images/open-book-hero.svg"
        alt="openings book"
        class="mobile-img"
      />
    </div>
    <div class="welcome-text">
      <h1>Find your opening to play</h1>
      <button class="primary-btn" @click="startQuiz">
        <img
          src="assets/images/magnifier.png"
          width="32"
          height="32"
          alt="magnifier"
        />
        <span>Take Quiz</span>
      </button>
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
  margin: auto;
  width: 100vw;
  overflow-x: hidden;
  padding: 2vh;
  gap: 40px;
}

.welcome-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 24px 40px;
  gap: 24px;
}

.welcome-image {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  max-height: 96vh;
  padding-top: 24px;
  gap: 24px;
}

.welcome-image img {
  object-fit: contain;
}

.welcome-text h1 {
  color: #fff;
  font-size: 56px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: start;
  font-family: "Chess Sans";
  display: flex;
}

.mobile-img {
  display: none;
}

@media only screen and (max-width: 1050px) {
  .welcome-image img {
    overflow: hidden;
  }
}

@media only screen and (max-width: 1024px) {
  .welcome-text p {
    color: #fff;
    font-family: "Chess Sans";
    font-size: 34px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .header-logo.desktop-img img {
    width: 290px;
    height: auto;
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
    padding: 24px 12px;
    align-items: center;
    gap: 26px;
    min-width: unset;
    max-width: 100%;
    width: 100%;
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

  .welcome-text p {
    color: #fff;
    text-align: center;
    font-family: "Chess Sans";
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0px;
  }

  .welcome-text .primary-btn {
    max-width: 225px;
    width: 100%;
  }

  footer nav {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
