import dispatchEvent from './htz-dispatch-event';
/**
 * Hide a dialog window.
 *
 * @callback module:htz-dialog#hide
 * @fires module:htz-dialog#dialog:hide-before
 * @fires module:htz-dialog#dialog:hide-after
 */
export function hide() {
  /**
   * Fired whenever a dialog is being closed.
   * Stops execution if any of its handlers calls `event.preventDefault`
   * @event module:htz-dialog#dialog:hide-before
   * @type {Object}
   * @prop {Object} details
   * @prop {HTMLElement} details.dialog - The closed dialog wrapper
   */
  const allowed = dispatchEvent(this.wrapper, 'dialog:hide-before', {
    dialog: wrapper,
  });

  if (allowed) {
    const visibleDialog = this.dialogs[this.visibleDialogIndex];
    this.isVisible = false;
    this.elemToConceal.removeAttribute('aria-hidden');
    this.focusOnClose && this.focusOnClose.focus();

    this.visibleDialogIndex = -1;
    visibleDialog && visibleDialog.setAttribute('aria-hidden', 'true');
    this.wrapper.setAttribute('aria-hidden', 'true');
    document.body.removeEventListener('focus', this.hideWhenFocusLost, true);
    document.body.removeEventListener('mousedown', this.hideWhenFocusLost);

    /**
     * Fired whenever a dialog is being closed.
     * @event module:htz-dialog#dialog:hide-after
     * @type {Object}
     * @prop {Object} details
     * @prop {HTMLElement} details.dialog - The closed dialog wrapper
     */
    dispatchEvent(wrapper, 'dialog:hide-after', {
      dialog: wrapper,
    });
  }
}
