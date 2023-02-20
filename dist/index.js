import "./styles/style.css";
export default {
    mounted(el, binding) {
        // If you use loader
        const elId = Math.round(Math.random() * 100000);
        let lastChild, slow, lazyLoader, lastChildCopy, updatedEl;
        el.setAttribute("id", `list-${elId}`);
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
                    }
                    else {
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
            updatedEl = document.getElementById(`list-${elId}`);
            if (updatedEl) {
                lastChild = updatedEl.lastElementChild;
                if (lastChild) {
                    observer.observe(lastChild);
                }
            }
        }, 1000);
    },
};
