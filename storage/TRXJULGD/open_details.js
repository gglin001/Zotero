function openTarget(){var hash=location.hash.substring(1);if(hash)var targ=document.getElementById(hash);if(targ){var el=targ;while(el.parentNode){if(el.tagName.toLowerCase()==='details')el.open=true;el=el.parentNode;}
targ.scrollIntoView(true);}}
window.addEventListener('hashchange',openTarget);openTarget();