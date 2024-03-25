import { shallowRef } from "vue";
import { useInterval } from "@vueuse/core";

export function useCountdown() {
  const time = shallowRef({
    minutes: 0,
    seconds: 0,
  });

  const { counter, reset, pause, resume } = useInterval(1000, {
    controls: true,
    immediate: false,
    callback: updateTimer,
  });

  function updateTimer(count) {
    // console.log("UPDATE");
    const timeleft = count;

    // const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    time.value = {
      // minutes,
      seconds: timeleft,
    };

    if (timeleft === 0) pause();
  }

  function formatNumber(number) {
    return number.toString().padStart(2, "0");
  }

  return { time, counter, reset, pause, resume, formatNumber };
}
