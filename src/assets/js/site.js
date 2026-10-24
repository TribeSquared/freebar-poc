// Replaces jQuery, Popper and Bootstrap's scripts, which the live site loads from
// outside services. Handles the three things they did here: the mobile menu,
// the About dropdown and the search pop-up. Works with the theme's own CSS.
(function () {
  "use strict";

  // Mobile menu
  document.querySelectorAll('[data-toggle="collapse"]').forEach(function (btn) {
    var target = document.querySelector(btn.getAttribute("data-target"));
    if (!target) return;
    btn.addEventListener("click", function () {
      var open = target.classList.toggle("show");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.classList.toggle("collapsed", !open);
    });
  });

  // Dropdowns (About)
  function closeDropdowns(except) {
    document.querySelectorAll(".dropdown.show").forEach(function (dd) {
      if (dd === except) return;
      dd.classList.remove("show");
      var menu = dd.querySelector(".dropdown-menu");
      if (menu) menu.classList.remove("show");
      var toggle = dd.querySelector('[data-toggle="dropdown"]');
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }
  document.querySelectorAll('[data-toggle="dropdown"]').forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      var dd = toggle.closest(".dropdown");
      var menu = dd && dd.querySelector(".dropdown-menu");
      if (!menu) return;
      closeDropdowns(dd);
      var open = dd.classList.toggle("show");
      menu.classList.toggle("show", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) closeDropdowns();
  });

  // Search pop-up
  var backdrop = null;
  var lastFocus = null;
  function openModal(modal) {
    lastFocus = document.activeElement;
    modal.style.display = "block";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    document.body.classList.add("modal-open");
    backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop fade";
    document.body.appendChild(backdrop);
    requestAnimationFrame(function () {
      modal.classList.add("show");
      backdrop.classList.add("show");
      var input = modal.querySelector("input");
      if (input) input.focus();
    });
  }
  function closeModal(modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    document.body.classList.remove("modal-open");
    if (backdrop) { backdrop.remove(); backdrop = null; }
    setTimeout(function () { modal.style.display = "none"; }, 150);
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-toggle="modal"]').forEach(function (opener) {
    var modal = document.querySelector(opener.getAttribute("data-target"));
    if (!modal) return;
    opener.addEventListener("click", function (e) { e.preventDefault(); openModal(modal); });
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.closest('[data-dismiss="modal"]')) closeModal(modal);
    });
  });

  // Escape closes whatever is open
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeDropdowns();
    var open = document.querySelector(".modal.show");
    if (open) closeModal(open);
  });
})();
