<template>
  <div class="header-logo mobile">
    <img
      src="/assets/images/mobile-header.svg"
      width="155"
      height="50"
      alt="Opening quiz header"
    />
  </div>
  <div class="welcome-page">
    <div class="welcome-text">
      <!-- <h1>
        <img
          src="/assets/images/opening.png"
          width="406"
          height="63"
          alt="Opening quiz heading"
        />
        <span>QUIZ</span>
      </h1> -->
      <div class="header-logo desktop">
        <img
          src="/assets/images/splash-header.svg"
          width="405"
          height="130"
          alt="Opening quiz header"
        />
      </div>
      <p>Which opening <br />should you play?</p>
      <button class="primary-btn" @click="startQuiz">
        <img
          src="/assets/images/magnifier.png"
          width="32"
          height="32"
          alt="magnifier"
        />
        <span>Take Quiz</span>
      </button>
    </div>
    <div class="welcome-image">
      <img
        src="/assets/images/opening-book.svg"
        width="962"
        height="613"
        alt="openings book"
        class="desktop"
      />
      <img
        src="/assets/images/opening-book-mob.svg"
        width="585"
        height="441"
        alt="openings book"
        class="mobile"
      />
    </div>
    <!-- <div class="cta-block mobile">
      <p>Which opening <br />should you play?</p>
      <button class="primary-btn" @click="startQuiz">
        <img
          src="/assets/images/magnifier.png"
          width="32"
          height="32"
          alt="magnifier"
        />
        <span>Take Quiz</span>
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  methods: {
    startQuiz() {
      this.$emit("startQuiz");
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
  max-width: 1150px;
  width: 100%;
}

.welcome-text {
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 486px;
  width: 100%;
  padding-top: 215px;
  padding-bottom: 177px;
  min-width: 40%;
  padding-left: 50px;
}

.welcome-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.welcome-image img {
  position: absolute;
  left: 0;
  object-fit: contain;
  width: 116%;
}

.welcome-text p {
  margin: 39px 0 40px;
  color: #fff;
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: start;
  font-family: "Chess Sans";
}

.mobile {
  display: none;
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
  .header-logo.desktop img {
    width: 290px;
    height: auto;
  }
}

@media only screen and (max-width: 640px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }

  .welcome-page {
    flex-direction: column-reverse;
  }

  .header-logo.mobile {
    padding: 52px 40px 35px;
    display: flex;
    align-items: center;
  }

  .welcome-text {
    max-width: 100%;
    width: 100%;
    padding-top: 0px;
    padding-bottom: 45px;
    min-width: unset;
    padding-left: 16px;
    padding-right: 16px;
    align-items: center;
    gap: 26px;
  }

  .welcome-image img {
    height: 100%;
    transform: translateX(-50%);
    left: 50%;
    width: auto;
  }

  .welcome-image {
    height: 441px;
    margin-bottom: -24px;
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
