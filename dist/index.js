import "../src/styles/style.css";
export default {
    mounted(el, binding) {
        // If you use loader
        const elId = Math.round(Math.random() * 100000);
        el.setAttribute("id", `list-${elId}`);
        let lastChildItem, lazyLoader, lastChildItemCopy, isTransitionWrapper, updatedEl;
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
                    if (!isTransitionWrapper) {
                        lastChildItemCopy = el.lastElementChild;
                    }
                    else {
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
                    }
                    else {
                        lastChildItem = el.lastChild.lastElementChild;
                    }
                    if (lastChildItemCopy == lastChildItem) {
                        return;
                    }
                    else {
                        observer.observe(lastChildItem);
                    }
                }, 3000);
            }
        };
        const observer = new IntersectionObserver(callback, options);
        setTimeout(() => {
            updatedEl = document.getElementById(`list-${elId}`);
            isTransitionWrapper =
                el.lastElementChild.tagName.toLowerCase() ==
                    "transition-group-stub";
            if (updatedEl && !isTransitionWrapper) {
                lastChildItem = updatedEl.lastElementChild;
                if (lastChildItem) {
                    observer.observe(lastChildItem);
                }
            }
            else if (updatedEl && isTransitionWrapper) {
                lastChildItem = updatedEl.lastChild;
                lastChildItem = lastChildItem.lastElementChild;
                if (lastChildItem) {
                    observer.observe(lastChildItem);
                }
            }
        }, 1000);
    },
};
