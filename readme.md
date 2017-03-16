jQuery based simplest autocomplete functionality based on ajax source for data.
=
Please follow the following steps to use this plugin.
----------
In your html's head section add following two lines.
```html
<link rel="stylesheet" type="text/css" href="simple-autocomplete.css">
<script type="text/javascript" src="simple-autocomplete.js"></script>
```
The Basic initialization for the plugin is as follow:
```javascript
<script type="text/javascript">
$(document).ready(function () {
	var options = {
			source:"url_to_json_data"
		};
	$("#input_autocomplete").simpleAutoComplete(options);
});	
</script>
```

Currently availble Options are as follow:

| Option        | Possible Values | Description
| ------------- |:-------------   |:-------------
| source        | "path_to_json_data" | URL to ajax source for json data
| highlight      | true/false, default:true     | The higilight option highlight add enclose the text of autocomplete item with input query. For example if you searched for "revenue" and in the suggestions there is an item as revenue cycle, then it will highlight the revenue and the string suggestion item will be like, "<strong>revenue</strong> cycle"
| minLength        | default: 3 | The minimum lenght which is required before suggestions are made.


I am working on make this plugin as simple as possible, though if you think something is missing and needed as well if there is any issue, feel free to update it and also log issues.

Thanks