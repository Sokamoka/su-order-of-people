import { onUnmounted } from "vue";

export function useWindowEvent(type, listener, options) {
  window.addEventListener(type, listener, options);
  onUnmounted(() => window.removeEventListener(type, listener, options));
}
