<template>
  <div ref="lottieContainer" class="lottie-animation" />
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import lottie from "lottie-web";

export default {
  name: "LottieAnimation",
  props: {
    animationPath: {
      type: String,
      required: true,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["animationComplete"],
  setup(props, { emit }) {
    const lottieContainer = ref(null);
    let animationInstance = null;

    onMounted(() => {
      animationInstance = lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: "svg",
        loop: props.loop,
        autoplay: props.autoplay,
        path: props.animationPath,
      });

      animationInstance.addEventListener("complete", () => {
        emit("animationComplete");
      });
    });

    onBeforeUnmount(() => {
      if (animationInstance) {
        animationInstance.destroy();
      }
    });

    return {
      lottieContainer,
    };
  },
};
</script>

<style scoped>
.lottie-animation {
  width: 100%;
  height: 100%;
}
</style>
