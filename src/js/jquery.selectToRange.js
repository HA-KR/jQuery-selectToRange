/*global $*/

(function () {
  function warn(msg) {
    if (typeof console === "object") {
      var i, type, TYPES = ['warn', 'debug', 'log'];
      for (i in TYPES) {
        type = TYPES[i];
        if (typeof console[type] === "function") {
          console[type](msg);
          return;
        }
      }
    }
  }
  if (typeof $ !== "function") {
    warn("`jQuery` library is not included, `selectToRange` plugin requires jQuery, get it form [jQuery]( https://jquery.com/download/ )");
  } else if (typeof $.fn.selectToRange === "function") {
    warn("`selectToRange` plugin is already initialized!");
  }
  var DEFAULT_OPTIONS = {
    timeout: 600,
    after: null,
    before: null
  };

  function prepareUI(that, options) {
    var $me = $(that);
    var min = $("option:first", that).val();
    var max = $("option:last", that).val();
    var value = $me.val();
    var inputWrapper = $("<div>", {
      "class": "qty-container",
      "html": '<a href="#" class="qty-change remove">-</a>'
    });
    var inputBox = $("<input>", {
        "class": "qty-input",
        "type": "text",
        "value": value,
        "readonly": true,
        "disabled": true,
        "data-min": parseInt(min, 10),
        "data-max": parseInt(max, 10)
      })
      .data("select-box", $me)
      .appendTo(inputWrapper);
    inputWrapper.append('<a href="#" class="qty-change add">+</a>');
    $me.addClass('hide');
    if (options.after) {
      $(options.after).after(inputWrapper);
    } else {
      if (options.before) {
        $(options.before).before(inputWrapper);
      } else {
        $me.after(inputWrapper);
      }
    }
    return inputWrapper;
  }

  function addEventListeners(that, options, inputWrapper) {
    $(".qty-change", inputWrapper).click(function (e) {
      e.preventDefault();
      var $me = $(this);
      var $target = $me.siblings(".qty-input");
      var $selectBox = $($target.data("select-box"));
      var min = $target.data("min");
      var max = $target.data("max");
      var value = parseInt($target.val(), 10);
      var updateTimeout = parseInt($selectBox.data('timeout'), 10);
      if ($me.hasClass("disabled") || !$selectBox.length) {
        return false;
      }
      if ($me.hasClass("add")) {
        if (value < max) {
          ++value;
          $me.siblings(".qty-change.remove").removeClass("disabled");
        } else {
          $me.addClass("disabled");
          return false;
        }
      } else {
        if (value > min) {
          --value;
          $me.siblings(".qty-change.add").removeClass("disabled");
        } else {
          $me.addClass("disabled");
          return false;
        }
      }
      $target.val(value);
      $selectBox.val(value);
      if ("number" === typeof updateTimeout) {
        clearTimeout(updateTimeout);
      }
      updateTimeout = setTimeout(function () {
        $selectBox.trigger("change");
      },options.timeout);
      $selectBox.data('timeout', updateTimeout);
    });
  }

  function selectToRange(options) {
    options = $.extend({}, DEFAULT_OPTIONS, options);
    return this.each(function () {
      var wrapper = prepareUI(this, options);
      addEventListeners(this, options, wrapper);
    });
  }

  //Initialize the jQuery plugin
  $.fn.selectToRange = selectToRange;
}());
