fetch(url, {
    method: 'POST',
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        q: "texto",
    })
})

document.addEventListener("DOMContentLoaded", function() {
    const userLang = navigator.language || navigator.userLanguage;
    const p = document.querySelector('p[translate="yes"]');
    if (p && !userLang.startsWith('en')) {
        fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${userLang.split('-')[0]}&dt=t&q=${encodeURIComponent(p.textContent)}`)
            .then(res => res.json())
            .then(data => {
                if (data && data[0] && data[0][0]) {
                    let translated = data[0][0][0];
                    translated = translated.charAt(0).toLowerCase() + translated.slice(1);
                    p.textContent = translated;
                }
            });
    }
});