import "../src/styles/style.css";

interface Binding {
  value: Function;
  arg: string;
}
interface El {
  lastElementChild: HTMLElement;
  lastChild: {
    lastElementChild: HTMLElement;
  };
  append: Function;
  removeChild: Function;
  setAttribute: Function;
  querySelectorAll: Function;
  querySelector: Function;
}
export default {
  mounted(el: El, binding: Binding) {
    let lastChildItem: HTMLElement,
      lazyLoader: HTMLElement,
      lastChildItemCopy: HTMLElement;

    // If you use loader
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
      rootElement?: RootElement | null;
      rootMargin?: string;
      threshold?: number | number[];
    }
    const options: ObserveOptions = {
      // rootElement: null,
      rootMargin: "0px",
      threshold: 0.75,
    };
    interface Entries {
      isIntersecting: boolean;
    }
    interface Observer {
      observe: Function;
      unobserve: Function;
    }
    const callback = async (entries: Entries[], observer: Observer) => {
      if (entries[0].isIntersecting) {
        lastChildItemCopy =
          el.querySelectorAll(".lazy-item")[
            el.querySelectorAll(".lazy-item").length - 1
          ];
        if (lazyLoader) {
          el.append(lazyLoader);
        }
        observer.unobserve(lastChildItem);
        await binding.value();

        if (lazyLoader) {
          el.removeChild(lazyLoader);
        }
        lastChildItem =
          el.querySelectorAll(".lazy-item")[
            el.querySelectorAll(".lazy-item").length - 1
          ];
        if (lastChildItemCopy == lastChildItem) {
          return;
        } else {
          observer.observe(lastChildItem);
        }
      }
    };
    const observer = new IntersectionObserver(callback, options);

    setTimeout(() => {
      if (el.querySelector(".lazy-item")) {
        lastChildItem =
          el.querySelectorAll(".lazy-item")[
            el.querySelectorAll(".lazy-item").length - 1
          ];
        if (lastChildItem) {
          observer.observe(lastChildItem);
        }
      } else {
        setTimeout(() => {
          lastChildItem =
            el.querySelectorAll(".lazy-item")[
              el.querySelectorAll(".lazy-item").length - 1
            ];
          if (lastChildItem) {
            observer.observe(lastChildItem);
          }
        }, 4000);
      }
    }, 1000);
  },
};
