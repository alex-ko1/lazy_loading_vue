import "./styles/style.css";

// export interface ComponentOptions {
//   mounted?(this: ComponentPublicInstance): void;
// }

export default {
  mounted(el: any, binding: any) {
    // If you use loader
    let lastChild: HTMLElement,
      slow: boolean,
      lazyLoader: HTMLElement,
      lastChildCopy: HTMLElement;
    if (binding.arg == "loader") {
      lazyLoader = document.createElement("div");
      lazyLoader.classList.add("vue-lazy-loader");
      lazyLoader.textContent = "Load...";
    }

    // Using Intersection Observer API for lazy loading posts in custom directives.
    interface RootElement {
      element: HTMLElement;
      id: string;
    }
    interface ObserveOptions {
      rootElement?: RootElement;
      rootMargin?: string;
      threshold?: number | number[];
    }
    const options: ObserveOptions = {
      //root: null,
      rootMargin: "0px",
      threshold: 0.75,
    };
    const callback = (
      entries: { isIntersecting: boolean }[],
      observer: { observe: Function; unobserve: Function }
    ) => {
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
