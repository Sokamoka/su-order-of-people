import { shallowRef } from "vue";
import { useInterval } from "@vueuse/core";

export function useCountdown() {
  const time = shallowRef({
    minutes: 0,
    seconds: 0,
  });

  const {
    counter,
    reset: timerReset,
    pause,
    resume,
  } = useInterval(1000, {
    controls: true,
    immediate: false,
    callback: updateTimer,
  });

  function updateTimer(count) {
    time.value = {
      minutes: 0,
      seconds: count,
    };
  }

  function formatNumber(number) {
    return number.toString().padStart(2, "0");
  }

  function reset() {
    updateTimer(0);
    timerReset();
  }

  return { time, counter, reset, pause, resume, formatNumber };
}
