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
}
export default {
  mounted(el: El, binding: Binding) {
    // If you use loader
    const elId: Number = Math.round(Math.random() * 100000);
    el.setAttribute("id", `list-${elId}`);

    let lastChildItem: HTMLElement,
      lazyLoader: HTMLElement,
      lastChildItemCopy: HTMLElement,
      updatedEl: HTMLElement;

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
    interface Entries {
      isIntersecting: boolean;
    }
    interface Observer {
      observe: Function;
      unobserve: Function;
    }
    const callback = (entries: Entries[], observer: Observer) => {
      if (entries[0].isIntersecting) {
        if (lazyLoader) {
          lastChildItemCopy =
            el.querySelectorAll(".lazy-item")[
              el.querySelectorAll(".lazy-item").length - 1
            ];
          el.append(lazyLoader);
        }
        observer.unobserve(lastChildItem);
        binding.value();

        setTimeout(() => {
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
        }, 3000);
      }
    };
    const observer = new IntersectionObserver(callback, options);

    updatedEl = document.getElementById(`list-${elId}`) as HTMLDivElement;
    if (updatedEl) {
      lastChildItem = updatedEl.querySelectorAll(".lazy-item")[
        el.querySelectorAll(".lazy-item").length - 1
      ] as HTMLDivElement;
      if (lastChildItem) {
        observer.observe(lastChildItem);
      }
    }
  },
};
