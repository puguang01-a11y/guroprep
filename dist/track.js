/* GuroPrep usage statistics: no cookies, nothing stored in the browser, no personal data.
   Sends only the page name and simple events (e.g. "lesson prepared, Grade 5 · Mathematics"). */
(function () {
  function send(data) {
    try {
      if (location.protocol === 'file:') return;
      var body = JSON.stringify(data);
      if (navigator.sendBeacon) navigator.sendBeacon('/api/stats/event', new Blob([body], {type: 'application/json'}));
      else fetch('/api/stats/event', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: body, keepalive: true});
    } catch (e) {}
  }
  window.gpTrack = function (type, extra) {
    var d = {type: type};
    if (extra) for (var k in extra) d[k] = extra[k];
    send(d);
  };
  var page = document.documentElement.getAttribute('data-page') ||
    (location.pathname.replace(/^.*\//, '').replace(/\.html$/, '') || 'home');
  if (page === 'index') page = 'home';
  send({type: 'view', page: page});
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href*="careers.html"]') : null;
    if (a && page !== 'careers') send({type: 'apply_click'});
  });
})();
