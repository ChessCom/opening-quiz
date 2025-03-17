<template>
  <div class="welcome-page">
    <div class="welcome-text">
      <h1>
        <img
          src="/assets/images/opening.png"
          width="406"
          height="63"
          alt="Opening quiz heading"
        />
        <span>QUIZ</span>
      </h1>
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
        src="/assets/images/opening-book.png"
        width="762"
        height="613"
        alt="openings book"
      />
    </div>
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
h1 {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: start;
}

h1 span {
  color: #81b64c;
  font-size: 70.45px;
  font-family: "Chess Sans";
  font-style: normal;
  font-weight: 700;
  line-height: 60.956px; /* 86.523% */
  letter-spacing: 3.522px;
  transform: scaleX(1.18);
  transform-origin: left;
}

.welcome-page {
  margin-top: 108px;
  margin-bottom: 177px;
  position: relative;
}

.welcome-text {
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 486px;
  width: 100%;
  padding-top: 108px;
  margin-left: 171px;
}

.welcome-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
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
</style>
