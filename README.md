A jQuery plugin for auto growing textareas.

Example usage: http://loonkwil.github.io/jquery.auto-grow/

# Install

Requirements [Bower](https://github.com/bower/bower)

```bash
bower install
```

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="css/auto-grow.css">
</head>
<body>
  <textarea></textarea>

  <script src="bower_components/jquery/jquery.js"></script>
  <script src="bower_components/jquery.auto-grow.js"></script>
  <script type="text/javascript">
    $(function() {
      $('textarea').autoGrow();
    });
  </script>
</body>
```
