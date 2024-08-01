<template>
  <article class="flex flex-col items-center">
    <div
      :class="[
        'rounded-full w-44 h-44 grid grid-cols-1 place-items-center',
        time.seconds > 45 ? 'bg-red-500' : 'bg-lime-500',
      ]"
    >
      <span class="font-bold text-9xl text-white mt-4">{{ formatNumber(time.seconds) }}</span>
    </div>
    <header class="text-2xl my-5">
      {{ state.index + 1 }}/{{ listLength }}
    </header>
    <transition name="fade" mode="out-in">
      <h1 :key="state.index" class="text-9xl">
        {{ currentPerson.name }}
      </h1>
    </transition>

    <transition name="fade" mode="out-in">
      <div :key="state.index" class="flex justify-between w-full my-3">
        <h3 class="text-5xl text-pink-500 mr-8">{{ currentPerson.stack }}</h3>
        <h2 class="text-5xl">
          <span v-if="state.index !== listLength - 1" class="text-pink-500"
            >Következő:
          </span>
          {{ nextPerson.name }}
        </h2>
      </div>
    </transition>
    <a
      href="#"
      class="mt-10 px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white hover:text-white text-2xl rounded-lg inline-block shadow"
      @click.prevent="stepNext"
      >Következő</a
    >
  </article>
  <aside class="absolute top-0 right-0 h-full p-10 flex items-center">
    <ul class="text-right">
      <li
        v-for="person in people"
        :key="person.name"
        :class="[
          'text-2xl',
          person.name === currentPerson.name ? 'text-pink-500' : '',
        ]"
      >
        {{ person.name }}
      </li>
    </ul>
  </aside>
</template>

<script>
import { computed, reactive } from "vue";
import { useWindowEvent } from "../composables/useWindowEvent";
import { useCountdown } from "../composables/useCountdown";
import { NAMES, COUNTDOWN_SECONDS } from "../constants";

export default {
  setup() {
    const state = reactive({
      index: 0,
    });

    const { counter, time, resume, reset, formatNumber } = useCountdown(COUNTDOWN_SECONDS);

    const listLength = computed(() => NAMES.length);

    const currentPerson = computed(() => NAMES[state.index]);
    const nextPerson = computed(() => {
      const person = NAMES[state.index + 1];
      if (person) return person;
      return { name: "Nincs több név a listán" };
    });

    const stepNext = () => {
      reset();
      resume();
      const next = state.index++;
      if (next >= listLength.value - 1) state.index = 0;
    };

    const stepBack = () => {
      reset();
      resume();
      const previous = state.index--;
      if (previous <= 0) state.index = listLength.value - 1;
    };

    useWindowEvent("keydown", (event) => {
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
        case " ":
          event.preventDefault();
          stepNext();
          break;
        case "Backspace":
        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          stepBack();
          break;
        default:
      }
    });

    return {
      currentPerson,
      nextPerson,
      stepNext,
      formatNumber,
      state,
      time,
      counter,
      listLength,
      people: NAMES,
    };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
