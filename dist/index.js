import "../src/styles/style.css";
export default {
    mounted(el, binding) {
        // If you use loader
        const elId = Math.round(Math.random() * 100000);
        el.setAttribute("id", `list-${elId}`);
        let currentObserver, lazyLoader, lastChildItem, updatedEl;
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
                    lastChildItem =
                        el.querySelectorAll(".lazy-item")[el.querySelectorAll(".lazy-item").length - 1];
                    el.append(lazyLoader);
                }
                observer.unobserve(currentObserver);
                binding.value();
                setTimeout(() => {
                    if (lazyLoader) {
                        el.removeChild(lazyLoader);
                    }
                    currentObserver =
                        el.querySelectorAll(".lazy-item")[el.querySelectorAll(".lazy-item").length - 1];
                    if (lastChildItem == currentObserver) {
                        return;
                    }
                    else {
                        observer.observe(currentObserver);
                    }
                }, 3000);
            }
        };
        const observer = new IntersectionObserver(callback, options);
        setTimeout(() => {
            updatedEl = document.getElementById(`list-${elId}`);
            if (updatedEl) {
                currentObserver = updatedEl.querySelectorAll(".lazy-item")[el.querySelectorAll(".lazy-item").length - 1];
                if (currentObserver) {
                    observer.observe(currentObserver);
                }
            }
        }, 1000);
    },
};
