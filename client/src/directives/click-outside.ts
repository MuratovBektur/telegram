export const clickOutside = {
  beforeMount(
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    el: { [key: string]: any },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    binding: { [key: string]: any }
  ): void {
    el.clickOutsideEvent = function (event: any) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  unmounted(el: { [key: string]: any }): void {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
