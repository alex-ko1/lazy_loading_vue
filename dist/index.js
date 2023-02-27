import "../src/styles/style.css";
export default {
    mounted(el, binding) {
        // If you use loader
        const elId = Math.round(Math.random() * 100000);
        el.setAttribute("id", `list-${elId}`);
        let lastChildItem, lazyLoader, lastChildItemCopy, updatedEl;
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
        const callback = async (entries, observer) => {
            if (entries[0].isIntersecting) {
                lastChildItemCopy =
                    el.querySelectorAll(".lazy-item")[el.querySelectorAll(".lazy-item").length - 1];
                if (lazyLoader) {
                    el.append(lazyLoader);
                }
                observer.unobserve(lastChildItem);
                await binding.value();
                // setTimeout(() => {
                if (lazyLoader) {
                    el.removeChild(lazyLoader);
                }
                lastChildItem =
                    el.querySelectorAll(".lazy-item")[el.querySelectorAll(".lazy-item").length - 1];
                if (lastChildItemCopy == lastChildItem) {
                    return;
                }
                else {
                    observer.observe(lastChildItem);
                }
                // }, 3000);
            }
        };
        const observer = new IntersectionObserver(callback, options);
        // updatedEl = document.getElementById(`list-${elId}`) as HTMLDivElement;
        // if (updatedEl) {
        //   lastChildItem = updatedEl.querySelectorAll(".lazy-item")[
        //     el.querySelectorAll(".lazy-item").length - 1
        //   ] as HTMLDivElement;
        //   if (lastChildItem) {
        //     observer.observe(lastChildItem);
        //   }
        // }
        setTimeout(() => {
            if (el.querySelector(".lazy-item")) {
                lastChildItem =
                    el.querySelectorAll(".lazy-item")[el.querySelectorAll(".lazy-item").length - 1];
                if (lastChildItem) {
                    observer.observe(lastChildItem);
                }
            }
            else {
                setTimeout(() => {
                    if (lastChildItem) {
                        lastChildItem =
                            el.querySelectorAll(".lazy-item")[el.querySelectorAll(".lazy-item").length - 1];
                        observer.observe(lastChildItem);
                    }
                }, 4000);
            }
        }, 1000);
    },
};
