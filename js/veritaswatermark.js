var manifest = chrome.runtime.getManifest();
var args = ["%c Veritas Watermark Remover%c v" + manifest.version + "%c by%c " + manifest.author + " %c " + manifest.homepage_url, "background: #222;color: #bada55", "background: #222;color: #c0ffee", "background: #222;color: #bada55", "background: #222;color: #c0ffee", ""];
console.log.apply(console, args);

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    remove_watermark();
});

observer.observe(document, {
    subtree: true,
    attributes: true
});

if(window.location.href.match(/.*veritas.at\/sbo\/ebook\/px\/[0-9]*\/files\/assets\/basic-html/)) {
    setTimeout(remove_watermark, 100);
}

function remove_watermark() {
    var maybe_watermark = $("#Page > div:last").html();
    if(maybe_watermark == null) {
        return;
    }
    // Yes, their sites have typos in the watermark... Like "Eigent m des VERIT S Verlags".
    if(maybe_watermark.indexOf("Eigentum") >= 0 ||
       maybe_watermark.indexOf("VERITAS") >= 0 ||
       maybe_watermark.indexOf("Verlags") >= 0) {
        $("#Page > div:last").remove();
        $("#Page > div:last").remove();
    }
}
