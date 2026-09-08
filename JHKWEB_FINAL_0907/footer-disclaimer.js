(function () {
 'use strict';
 const opener = document.getElementById('jhk-disclaimer-open');
 const dialog = document.getElementById('jhk-disclaimer-dialog');
 if (!opener || !dialog) return;
 let returnFocus = null;
 let previousOverflow = '';

 function closeDisclaimer() {
  if (dialog.open) dialog.close();
 }
 opener.addEventListener('click', function () {
  if (dialog.open) return;
  returnFocus = document.activeElement;
  previousOverflow = document.documentElement.style.overflow;
  dialog.showModal();
  document.documentElement.style.overflow = 'hidden';
  dialog.querySelector('.jhk-disclaimer-dialog__body').scrollTop = 0;
 });
 dialog.querySelectorAll('[data-disclaimer-close]').forEach(function (button) {
  button.addEventListener('click', closeDisclaimer);
 });
 dialog.addEventListener('click', function (event) {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
   closeDisclaimer();
  }
 });
 dialog.addEventListener('cancel', function (event) {
  event.preventDefault();
  closeDisclaimer();
 });
 dialog.addEventListener('close', function () {
  document.documentElement.style.overflow = previousOverflow;
  if (returnFocus && returnFocus.isConnected) returnFocus.focus({preventScroll:true});
 });
})();
