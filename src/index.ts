import "./styles/style.css";

interface Binding {
  value: Function;
  arg: string;
}
interface El {
  lastElementChild: HTMLElement;
  append: Function;
  removeChild: Function;
  setAttribute: Function;
}
export default {
  mounted(el: El, binding: Binding) {
    // If you use loader
    const elId: Number = Math.round(Math.random() * 100000);

    let lastChild: HTMLElement,
      slow: boolean,
      lazyLoader: HTMLElement,
      lastChildCopy: HTMLElement,
      updatedEl;

    el.setAttribute("id", `list-${elId}`);
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
        // setTimeout(
        //   () => {
        //     observer.unobserve(lastChild);
        //     el.removeChild(lazyLoader);
        //     lastChild = el.lastElementChild;
        //     if (lastChildCopy == lastChild) return;
        //     else observer.observe(lastChild);
        //   },
        //   !slow ? 1000 : 4000
        // );
        setTimeout(() => {
          observer.unobserve(lastChild);
          el.removeChild(lazyLoader);
          lastChild = el.lastElementChild;
          if (lastChildCopy == lastChild) {
            return;
          } else {
            observer.observe(lastChild);
          }
        }, 3000);
      }
    };
    const observer = new IntersectionObserver(callback, options);
    // setTimeout(() => {
    //   lastChild = el.lastElementChild;
    //   if (lastChild) {
    //     observer.observe(lastChild);
    //   } else {
    //     slow = true;
    //     setTimeout(() => {
    //       lastChild = el.lastElementChild;
    //       observer.observe(lastChild);
    //     }, 6000);
    //   }
    // }, 1000);
    setTimeout(() => {
      updatedEl = document.getElementById(`list-${elId}`) as HTMLDivElement;
      if (updatedEl) {
        lastChild = updatedEl.lastElementChild as HTMLDivElement;
        if (lastChild) {
          observer.observe(lastChild);
        }
      }
    }, 1000);
  },
};
