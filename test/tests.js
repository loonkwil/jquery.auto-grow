;(function(window, undefined) {
  "use strict";

  var $ = window.jQuery;
  var q = window.QUnit;
  q.config.autostart = false;

  var setTextareaValue = function($textarea, value) {
    $textarea.val(value).trigger('input');
  };

  var escape = function(html) {
    return html.
      replace(/&/g, '&amp;').
      replace(/>/g, '&gt;').
      replace(/</g, '&lt;');
  };

  var largeText = function() {
    var ret = [];
    for( var i = 0; i < 1000; ++i ) { ret.push('Lorem ipsum dolor sit amet.'); }
    return ret.join(' ');
  }();

  var $currentTextarea;
  var $currentShadow;
  var initialText;

  q.begin(function() {
    q.start();
  });

  q.module(
    '#1 minimum height: undefined', {
      setup: function() {
        $currentTextarea = $('textarea').eq(0);

        initialText = $currentTextarea.val();

        $currentTextarea.autoGrow();

        $currentShadow = $currentTextarea.siblings('.auto-growing-editor');
      }
    }
  );

  q.test('test initial width and height', function() {
    expect(2);
    q.equal($currentTextarea.width(), $currentShadow.width());
    q.equal($currentTextarea.height(), $currentShadow.height());
  });

  q.test('test initial text value', function() {
    expect(2);
    q.equal($currentTextarea.val(), initialText);
    q.equal($currentShadow.text(), initialText);
  });

  q.test('test shadow text value', function() {
    expect(3);
    q.equal($currentShadow.text(), $currentTextarea.val());

    var input = 'abcd';
    setTextareaValue($currentTextarea, input);

    q.equal($currentTextarea.val(), input);
    q.equal($currentShadow.text(), input);
  });

  q.test('test textarea growing', function() {
    expect(2);
    var heightBefore = $currentTextarea.height();
    setTextareaValue($currentTextarea, largeText);
    var heightAfter = $currentTextarea.height();

    q.ok(heightBefore < heightAfter);
    q.equal($currentTextarea.prop('scrollHeight'), heightAfter);
  });

  q.test('test textarea shrinking', function() {
    expect(2);
    setTextareaValue($currentTextarea, largeText);
    var heightBefore = $currentTextarea.height();

    setTextareaValue($currentTextarea, '');
    var heightAfter = $currentTextarea.height();

    q.ok(heightBefore > heightAfter);
    q.equal($currentTextarea.prop('scrollHeight'), heightAfter);
  });

  q.test('test the shadow width and the height value after growing', function() {
    expect(2);
    setTextareaValue($currentTextarea, largeText);

    q.equal($currentTextarea.width(), $currentShadow.width());
    q.equal($currentTextarea.height(), $currentShadow.height());
  });

  q.test('test HTML escaping', function() {
    expect(2);
    var input = '<b>abcd</b>';
    setTextareaValue($currentTextarea, input);

    q.equal($currentTextarea.val(), input);
    q.equal($currentShadow.html(), escape(input));
  });


  q.module(
    '#2 minimum height: 100px', {
      setup: function() {
        $currentTextarea = $('textarea').eq(1).autoGrow();
        $currentShadow = $currentTextarea.siblings('.auto-growing-editor');
      }
    }
  );

  q.test('test the minimum width', function() {
    expect(2);
    var minHeight = $currentTextarea.height();

    setTextareaValue($currentTextarea, largeText);
    q.ok(minHeight < $currentTextarea.height());

    setTextareaValue($currentTextarea, '');
    q.equal($currentTextarea.height(), minHeight);
  });


  q.module(
    '#3 minimum height: 10 row', {
      setup: function() {
        $currentTextarea = $('textarea').eq(2).autoGrow({
          highlight: function(str) {
            return escape(str).replace(/(highlight)/g, '<mark>$1</mark>');
          }
        });
        $currentShadow = $currentTextarea.siblings('.auto-growing-editor');
      }
    }
  );

  q.test('test the minimum width', function() {
    expect(2);
    var minHeight = $currentTextarea.height();

    setTextareaValue($currentTextarea, largeText);
    q.ok(minHeight < $currentTextarea.height());

    setTextareaValue($currentTextarea, '');
    q.equal($currentTextarea.height(), minHeight);
  });

  q.test('test highlighting', function() {
    setTextareaValue($currentTextarea, 'highlight');
    q.equal($currentTextarea.val(), 'highlight');
    q.equal($currentShadow.html(), '<mark>highlight</mark>');
  });
})(window);
