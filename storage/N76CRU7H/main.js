$(document).ready(function () {

  $("#reviewsframe").load(function() {  //temp for iframes
      $(this).height( $(this).contents().find("body").height() );
  });

  if (typeof(MathJax) != 'undefined') {
     MathJax.Hub.Config({
       jax: ["input/TeX","input/MathML","input/AsciiMath","output/HTML-CSS","output/NativeMML"],
       extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js"],
       TeX: {
          extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
       },
       tex2jax: {
         inlineMath: [ ['$','$'], ['\\(','\\)'] ]
       },
     });
  }

  $("input.search").keypress(function(event) {
      if (event.which == 13) {
          event.preventDefault();
          $("form.search").submit();
      }
  });
});