/**
 * A jQuery plugin for auto growing textareas
 * https://github.com/loonkwil/auto-growing-textarea
 *
 * Date: Dec 14 2013
 */
(function(window, undefined) {
  "use strict";

  var $ = window.jQuery;

  /**
   * @type {Object}
   */
  var defaultOptions = {
    recalculateOnResize: true,
    highlight: null
  };

  /**
   * @param {string} str
   * @return {string}
   */
  var escape = function(str) {
    return str.
      replace(/&/g, '&amp;').
      replace(/>/g, '&gt;').
      replace(/</g, '&lt;');
  };

  /**
   * @param {jQuery} $textarea
   * @param {function(string): string} convert
   */
  var fixAutoGrowingContent = function($textarea, highlight) {
    var $shadow = $textarea.siblings('.auto-growing-editor');

    var text = $textarea.val();
    if( typeof highlight === 'function' ) {
      text = highlight(text);
    }
    else {
      text = escape($textarea.val());
    }

    $shadow.
      html(text).
      height('auto');

    var height = Math.max(
      $shadow.height(),
      $textarea.data('minHeight')
    );

    $textarea.height(height);
    var scrollHeight = $textarea.prop('scrollHeight');
    if( scrollHeight > height ) {
      height = scrollHeight;
      $textarea.height(height);
    }

    $shadow.height(height);
  };


  /**
   * @param {Object} options Avriable options:
   *   {boolean} recalculateOnResize = true recalculate textarea height on
   *   window resize,
   *   {function} highlight
   * @return {jQuery}
   */
  $.fn.autoGrow = function(options) {
    options = $.extend({}, defaultOptions, options);

    var $textareas = this;

    // window resize event
    if( options.recalculateOnResize ) {
      var resizeTick = null;
      $(window).on('resize', function() {
        if( resizeTick !== null ) {
          return;
        }

        resizeTick = window.setTimeout(function() {
          $textareas.each(function() {
            fixAutoGrowingContent($(this), options.highlight);
          });

          resizeTick = null;
        }, 100);
      });
    }

    return $textareas.each(function() {
      var $textarea = $(this).addClass('auto-growing-editor');

      var hasFocus = $textarea.is(':focus');

      var minHeight = $textarea.height();
      $textarea.data('minHeight', minHeight);

      var $shadow = $('<pre />', {
        'class': 'auto-growing-editor'
      });

      $textarea.
        wrap('<div />').
        parent().
        addClass('auto-growing-editor-container').
        append($shadow);

      // Fixing iOS Safari bug
      // http://stackoverflow.com/questions/6890149/remove-3-pixels-in-ios-webkit-textarea
      if( /iPhone|iPad/i.test(navigator.userAgent) ) {
        $shadow.css({paddingLeft: '+=3px', paddingRight: '+=3px'});
      }

      fixAutoGrowingContent($textarea, options.highlight);

      if( hasFocus ) {
        $textarea.focus();
      }

      // events
      $textarea.on('input', function() {
        fixAutoGrowingContent($textarea, options.highlight);
      });
    });
  };
}(window));
