/*!
 * @author : Shandeep (http://shandeep.dev)
 */
(function (e) { "use strict"; e.fn.textTyper = function (t) { var n = { typingClass: "typing", beforeAnimation: function () { }, afterAnimation: function () { }, speed: 10, nextLineDelay: 400, startsFrom: 0, repeatAnimation: false, repeatDelay: 4e3, repeatTimes: 1, cursorHtml: '<span class="cursor">|</span>' }, r = e.extend({}, n, t); this.each(function () { var t = e(this), n = 1, i = "typingCursor"; var s = t, o = s.length, u = []; while (o--) { u[o] = e.trim(e(s[o]).html()); e(s[o]).html("") } t.init = function (e) { var n = r.beforeAnimation; if (n) n(); t.animate(0) }; t.animate = function (o) { var a = s[o], f = r.typingClass, l = r.startsFrom; e(a).addClass(f); var c = setInterval(function () { var f = r.cursorHtml; f = e("<div>").append(e(f).addClass(i)).html(); e(a).html(u[o].substr(0, l) + f); l++; if (u[o].length < l) { clearInterval(c); o++; if (s[o]) { setTimeout(function () { e(a).html(u[o - 1]); t.animate(o) }, r.nextLineDelay) } else { e(a).find("." + i).remove(); if (r.repeatAnimation && (r.repeatTimes == 0 || n < r.repeatTimes)) { setTimeout(function () { t.animate(0); n++ }, r.repeatDelay) } else { var h = r.afterAnimation; if (h) h() } } } }, r.speed) }; t.init() }); return this } })(jQuery)
$(document).ready(function () {
  $('#home').addClass('open');
  $('#home').textTyper({
    speed: 20,
    afterAnimation: function () {
      $('.command').fadeIn();
      $('input[type="text"]').focus();
      $('input[type="text"]').val('');
    }
  });
});

var title = "Hello World! ";
var position = 0;
function scrolltitle() {
  document.title = title.substring(position, title.length) + title.substring(0, position);
  position++;
  if (position > title.length) position = 0;
  titleScroll = window.setTimeout(scrolltitle, 170);
}
scrolltitle();
