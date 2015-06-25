jQuery Select To Range
======================
Converts a select input to a text field with + and - buttons

Installation
------------
```html
<script type='text/javascript' src='path/to/jquery.selectToRange.js'></script>

<link rel='stylesheet' type='text/css' href='path/to/select_to_range.css'>
```

Usage
------
```js
$('#quantity').selectToRange();
```
```js
$('input[type="select"]').selectToRange({
  before: '#add-to-cart',
  timeout: 0
});
```

Options
--------
* `after`: position input range *after* the specified selector or jQuery object
* `before`:  position input range *before* the specified selector or jQuery object
* `timeout`: specify timeout in milli-seconds to update the value of select box, default is 600

Contributing
-------------
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
