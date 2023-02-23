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
}
export default {
  mounted(el: El, binding: Binding) {
    // If you use loader
    const elId: Number = Math.round(Math.random() * 100000);
    el.setAttribute("id", `list-${elId}`);

    let lastChildItem: HTMLElement,
      lazyLoader: HTMLElement,
      lastChildItemCopy: HTMLElement,
      isTransitionWrapper: boolean,
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
          if (!isTransitionWrapper) {
            lastChildItemCopy = el.lastElementChild;
          } else {
            lastChildItemCopy = el.lastChild.lastElementChild;
          }
          el.append(lazyLoader);
        }
        binding.value();

        setTimeout(() => {
          observer.unobserve(lastChildItem);
          if (lazyLoader) {
            el.removeChild(lazyLoader);
          }
          if (!isTransitionWrapper) {
            lastChildItem = el.lastElementChild;
          } else {
            lastChildItem = el.lastChild.lastElementChild;
          }
          if (lastChildItemCopy == lastChildItem) {
            return;
          } else {
            observer.observe(lastChildItem);
          }
        }, 3000);
      }
    };
    const observer = new IntersectionObserver(callback, options);

    setTimeout(() => {
      updatedEl = document.getElementById(`list-${elId}`) as HTMLDivElement;
      isTransitionWrapper =
        el.lastElementChild.tagName.toLowerCase() ==
        ("transition-group-stub" as String);
      if (updatedEl && !isTransitionWrapper) {
        lastChildItem = updatedEl.lastElementChild as HTMLDivElement;
        if (lastChildItem) {
          observer.observe(lastChildItem);
        }
      } else if (updatedEl && isTransitionWrapper) {
        lastChildItem = updatedEl.lastChild as HTMLDivElement;
        lastChildItem = lastChildItem.lastElementChild as HTMLDivElement;
        if (lastChildItem) {
          observer.observe(lastChildItem);
        }
      }
    }, 1000);
  },
};
