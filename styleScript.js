const root = document.querySelector("header");

const span = (text, index) => {
    const node = document.createElement("span");
    node.textContent = text;
    node.style.setProperty("--index", index);
    return node;
};

const byLetter = (text) => [...text].map(span);
const byWord = (text) => text.split(" ").map(span);

const { matches: motionOK } = window.matchMedia(
    "(prefers-reduced-motion: no-preference)"
);

function initAnimation() {
    if (motionOK) {
        const splitTargets = document.querySelectorAll("[split-by]");

        splitTargets.forEach((node) => {
            const type = node.getAttribute("split-by");
            let nodes = null;

            if (type === "letter") nodes = byLetter(node.innerText);
            else if (type === "word") nodes = byWord(node.innerText);

            if (nodes) node.firstChild.replaceWith(...nodes);
        });
    }

    if (root) {
        root.style.setProperty("--speed", "1200ms");
    }
}

// Spustit hned po načtení DOM
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initAnimation);
} else {
    initAnimation();
}