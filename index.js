const url = new URL(window.location.href)
const params = new URLSearchParams(window.location.search)
const text = params.get("t");

const textDiv = document.getElementById('text')

if (text === null) {
    textDiv.appendChild(document.createTextNode('Replace with your message'))
    setTimeout(() => {
        textDiv.focus()
        textDiv.selectionStart = textDiv.selectionEnd = textDiv.innerText.length
    }, 0)
} else {
    textDiv.appendChild(document.createTextNode(text))
    document.title = text
}

function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

textDiv.addEventListener('input', debounce(event => {
    const text = event.target.innerText
    params.set('t', text.trim())
    url.search = params
    window.history.replaceState(null, '', url)
    document.title = text || 'Big Text'
}, 500));

