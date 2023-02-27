import "../src/styles/style.css";
export default {
    mounted(el, binding) {
        let lastChildItem, lazyLoader, lastChildItemCopy;
        // If you use loader
        if (binding.arg == "loader") {
            lazyLoader = document.createElement("div");
            lazyLoader.classList.add("vue-lazy-loader");
            lazyLoader.textContent = "Load...";
        }
        const options = {
            // rootElement: null,
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
            }
        };
        const observer = new IntersectionObserver(callback, options);
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
                    lastChildItem =
                        el.querySelectorAll(".lazy-item")[el.querySelectorAll(".lazy-item").length - 1];
                    if (lastChildItem) {
                        observer.observe(lastChildItem);
                    }
                }, 4000);
            }
        }, 1000);
    },
};
