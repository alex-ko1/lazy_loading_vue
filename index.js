export default {
  mounted(el, binding) {
    // Using Intersection Observer API for lazy loading posts in custom directives.
    let lastChild, slow;
    const options = {
      //root: null,
      rootMargin: "0px",
      threshold: 0.75,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        binding.value();
        setTimeout(
          () => {
            observer.unobserve(lastChild);
            lastChild = el.lastElementChild;
            observer.observe(lastChild);
          },
          !slow ? 1000 : 3000
        );
      }
    };
    const observer = new IntersectionObserver(callback, options);
    setTimeout(() => {
      lastChild = el.lastElementChild;
      if (lastChild) {
        observer.observe(lastChild);
      } else {
        slow = true;
        setTimeout(() => {
          lastChild = el.lastElementChild;
          observer.observe(lastChild);
        }, 2000);
      }
    }, 1000);
  },
};
