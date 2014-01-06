A jQuery plugin for auto growing textareas.

Example usage: http://loonkwil.github.io/jquery.auto-grow/

# Install

Requirements [Bower](https://github.com/bower/bower)

```bash
bower install git@github.com:loonkwil/jquery.auto-grow.git --save
```

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="bower_components/jquery.auto-grow/auto-grow.css">
</head>
<body>
  <textarea></textarea>

  <script src="bower_components/jquery/jquery.js"></script>
  <script src="bower_components/jquery.auto-grow/jquery.auto-grow.js"></script>
  <script type="text/javascript">
    $(function() {
      $('textarea').autoGrow();
    });
  </script>
</body>
```
