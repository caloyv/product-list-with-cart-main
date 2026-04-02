export function createBtn(text, className) {
    const btn = document.createElement("button");
    if (className) {
        btn.classList.add(className);
    }
    btn.textContent = text;
    return btn;
}

export function createSpan(text, className) {
    const span = document.createElement("span");
    if (className) {
        span.classList.add(className);
    }
    span.textContent = text;
    return span;
}

export function createParagraph(text, className) {
    const paragraph = document.createElement("p");
    if (!className) {
    } else {
        paragraph.classList.add(className);
    }
    paragraph.textContent = text;
    return paragraph;
}

export function createDiv(className, attr) {
    const div = document.createElement("div");
    div.classList.add(className);
    if (attr) {
        div.setAttribute(attr[0], attr[1]);
    } else {
    }
    return div;
}

export function createImg(src, alt, className) {
    const img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", alt);
    if(className) {
        img.classList.add(className)
    } else {

    }
    return img;
}

export function formatPrice(num) {
    num = Math.floor(num * 100) / 100;
    return num.toFixed(2);
}

export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args);}, timeout);
    }
}