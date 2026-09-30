(function (window, document) {
  "use strict";
  function boot() {
    if (!window.AO_DESTINATIONS || document.getElementById("ao-destination-map")) return;
    var nav = document.querySelector(".ao-site-nav");
    if (!nav) return;
    var links = nav.querySelector(".ao-site-nav__links") || nav;
    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "ao-site-nav__link ao-map-trigger";
    trigger.textContent = "DESTINATIONS";
    trigger.setAttribute("aria-expanded", "false");
    links.appendChild(trigger);

    var overlay = document.createElement("section");
    overlay.id = "ao-destination-map";
    overlay.setAttribute("aria-label", "AO destination map");
    overlay.innerHTML = '<div class="ao-map-backdrop"></div><div class="ao-map-panel" role="dialog" aria-modal="true" aria-labelledby="ao-map-title"><div class="ao-map-header"><div><div class="ao-map-kicker">AO UNIVERSE // DESTINATION REGISTRY</div><h2 id="ao-map-title">Choose your next signal</h2><p class="ao-map-context"></p></div><button class="ao-map-close" type="button" aria-label="Close destination map">×</button></div><div class="ao-map-filters" role="tablist"><button type="button" data-filter="all" class="active">ALL</button><button type="button" data-filter="play">PLAY</button><button type="button" data-filter="world">WORLDS</button><button type="button" data-filter="create">CREATE</button><button type="button" data-filter="social">SOCIAL</button></div><div class="ao-map-grid"></div></div>';
    document.body.appendChild(overlay);

    var grid = overlay.querySelector(".ao-map-grid");
    var context = window.AOBridge ? window.AOBridge.context() : { house: "1", houseName: "Pixel & Dot", mount: "aurora" };
    overlay.querySelector(".ao-map-context").textContent = "HOUSE " + context.house + " • " + context.houseName + " • MOUNT " + context.mount;

    function render(filter) {
      grid.innerHTML = "";
      window.AO_DESTINATIONS.filter(function (item) { return filter === "all" || item.category === filter; }).forEach(function (item) {
        var card = document.createElement("article");
        card.className = "ao-map-card";
        var state = item.status === "live" ? "LIVE" : item.status === "preview" ? "PREVIEW" : item.status === "source" ? "SOURCE" : "PENDING";
        var href = window.AOBridge ? window.AOBridge.decorateUrl(item.url, { houseAware: item.houseAware }) : item.url;
        card.innerHTML = '<div class="ao-map-card-top"><span class="ao-map-category">' + item.category.toUpperCase() + '</span><span class="ao-map-status status-' + item.status + '">' + state + '</span></div><h3>' + item.name + '</h3><p>' + item.description + '</p><div class="ao-map-card-foot"><span>' + item.integration + '</span><a href="' + href + '"' + (item.integration === "external-source" ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + (item.status === "source" ? "VIEW SOURCE" : "ENTER") + ' ↗</a></div>';
        grid.appendChild(card);
      });
    }
    render("all");

    function close() { overlay.classList.remove("open"); trigger.setAttribute("aria-expanded", "false"); }
    trigger.addEventListener("click", function () { overlay.classList.add("open"); trigger.setAttribute("aria-expanded", "true"); });
    overlay.querySelector(".ao-map-close").addEventListener("click", close);
    overlay.querySelector(".ao-map-backdrop").addEventListener("click", close);
    overlay.querySelectorAll("[data-filter]").forEach(function (button) { button.addEventListener("click", function () { overlay.querySelectorAll("[data-filter]").forEach(function (b) { b.classList.remove("active"); }); button.classList.add("active"); render(button.dataset.filter); }); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape") close(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window, document);
