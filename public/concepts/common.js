/* Shared by the concept pages. */
(function () {
  var d = document;
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' }) : null;
  window.revealAll = function (root) { (root || d).querySelectorAll('[data-reveal]:not(.in)').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); }); };
  window.imgUrl = function (k) { return 'img/' + k + '.jpg'; };
  window.cardMeta = function (l) { return l.beds + ' bed · ' + l.baths + ' bath · ' + l.sqft + ' sq ft'; };
  // After 15 seconds, offer the listing system once per visit.
  setTimeout(function () {
    try { if (sessionStorage.getItem('cc-pop')) return; sessionStorage.setItem('cc-pop', '1'); } catch (e) {}
    var el = d.createElement('div'); el.className = 'cc-pop'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Try the listing system');
    el.innerHTML = '<button class="x" aria-label="Close">×</button><b>Want to try the listing system?</b><p>Add a property, publish it and watch this website update. It takes about a minute.</p><div class="cc-pop__row"><a class="go" href="/demo/admin">Try the listing system</a><button type="button">Not now</button></div>';
    el.querySelectorAll('button').forEach(function (b) { b.addEventListener('click', function () { el.remove(); }); });
    d.body.appendChild(el);
  }, 15000);
  d.addEventListener('DOMContentLoaded', function () { window.revealAll(); });
})();
