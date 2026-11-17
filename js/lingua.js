// Italiano / English: mostra solo i testi della lingua scelta.
// Prima volta: la lingua del browser (italiano se è italiano, altrimenti inglese).
(function () {
  var saved = null;
  try { saved = localStorage.getItem("lingua"); } catch (e) {}
  var lang = saved || ((navigator.language || "").toLowerCase().indexOf("it") === 0 ? "it" : "en");

  function apply(l) {
    document.documentElement.lang = l;
    document.querySelectorAll("[data-l]").forEach(function (el) {
      el.hidden = el.getAttribute("data-l") !== l;
    });
    document.querySelectorAll(".lingue button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set") === l ? "true" : "false");
    });
    var t = document.querySelector("meta[name='titolo-" + l + "']");
    if (t) document.title = t.content;
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(lang);
    document.querySelectorAll(".lingue button").forEach(function (b) {
      b.addEventListener("click", function () {
        lang = b.getAttribute("data-set");
        try { localStorage.setItem("lingua", lang); } catch (e) {}
        apply(lang);
      });
    });
  });
})();
