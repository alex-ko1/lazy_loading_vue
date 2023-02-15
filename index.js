export default {
  mounted(el, binding) {
    // Using Intersection Observer API for lazy loading posts in custom directives.
    let lastChild, slow, lazyLoader;
    if (binding.arg == "loader") {
      lazyLoader = document.createElement("div");
      lazyLoader.classList.add("lazyLoader");
      lazyLoader.textContent = "Load...";
      lazyLoader.style.textAlign = "center";
      lazyLoader.style.color = "red";
      lazyLoader.style.margin = "10px 0";
    }
    const options = {
      //root: null,
      rootMargin: "0px",
      threshold: 0.75,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        if (lazyLoader) {
          el.append(lazyLoader);
        }
        binding.value();
        setTimeout(
          () => {
            observer.unobserve(lastChild);
            el.removeChild(lazyLoader);
            lastChild = el.lastElementChild;
            observer.observe(lastChild);
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
      }
    }, 1000);
    setTimeout(() => {
      if (lastChild) {
        lastChild = el.lastElementChild;
        observer.observe(lastChild);
      }
    }, 4000);
    setTimeout(() => {
      if (lastChild) {
        lastChild = el.lastElementChild;
        observer.observe(lastChild);
      }
    }, 6000);
  },
};
