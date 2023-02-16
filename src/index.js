import "./styles/style.css";
export default {
  mounted(el, binding) {
    // Using Intersection Observer API for lazy loading posts in custom directives.
    let lastChild, slow, lazyLoader, lastChildCopy;
    if (binding.arg == "loader") {
      lazyLoader = document.createElement("div");
      lazyLoader.classList.add("vue-lazy-loader");
      lazyLoader.textContent = "Load...";
    }
    const options = {
      //root: null,
      rootMargin: "0px",
      threshold: 0.75,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        if (lazyLoader) {
          lastChildCopy = el.lastElementChild;
          el.append(lazyLoader);
        }
        binding.value();
        setTimeout(
          () => {
            observer.unobserve(lastChild);
            el.removeChild(lazyLoader);
            lastChild = el.lastElementChild;
            if (lastChildCopy == lastChild) return;
            else observer.observe(lastChild);
          },
          !slow ? 1000 : 4000
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
        }, 6000);
      }
    }, 1000);
  },
};
