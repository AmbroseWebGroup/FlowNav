# FlowNav

A prebuilt cascading navigation menu in vanilla HTML, CSS & JS with recursively defined dropdowns and hyperlinks, purpose-built to support all modern browsers and all screen sizes and written to be customisable in style, contact and functionality.

## Implementation

### Prerequisites

- Just a browser that supports reasonably modern versions of HTML, JS (ES6) & CSS

### Usage


1. Copy the `flownav` directory into the root of your webpage

1. Add the following code to your `<head>` tag, modifying the relative paths if required
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script type="text/javascript" src="./flownav/flownav.min.js"></script>
<link rel="stylesheet" href="./flownav/flownav.min.css" />
```

1. if the relative path from your HTML file to your root directory is not `.` (i.e. your links aren't relative to your page) then you'll need to execute the following code in a `<script>` tag to change the root directory
```javascript
// replace .. with the relative path to root
fnRoot = "..";
```

1. Add this line of code  somewhere inside the `<body>` tag where you'd like the navigation menu to appear
```HTML
<nav id="flownav"></nav>
```

1. Add this line of code somewhere inside the `<body>` tag where you'd like the mobile menu button to appear
```HTML
<button id="flownav-hamburger"></button>
```


1. Edit the `navbar.json` file to contain your desired navigation layout based on the template provided. You can nest as many times as you want! **please note**: relative references should have a leading `/`
```json
{
  "Top Item 1": {
    "Sub Item 1": "/link-to-relative-directory/",
    "Sub Item 2": "http://linktosub.item/2"
  },
  "Top Item 2": "http://linktotop.item/2"
}
```

1. And you're done!

## Known Issues

- **Trailing commas in `navbar.json`:** Please make sure that you parse your JSON file before testing the system. If the file has trailing commas at the end of an array/dictionary, the JSON will not parse during the XMLHttpRequest and will throw an error making the navigation structure unreadable.
- **Trailing slashes in `fnRoot`:** Please ensure that there is no trailing `/` or `\` when assigning a custom value to the `fnRoot` variable as this will result in hyperlinks with `//` or `\\` in them which may not process correctly in all browsers.
- **Leading dot(s) or missing slash in `navbar.json`:** Relative references inside your `navbar.json` file need to start with a `/` and be relative to your defined `fnRoot`.

## Changelog

### Alpha 1.1.4

- The directory to which the relative navbar links originate from can now be changed using the `fnRoot` global variable.

### Alpha 1.1.3

- **Bug Fix**: if there are scripts in the current document that are hard-coded, the code to get the relative `navbar.json` path would not run correctly.

### Alpha 1.1.2

- The JSON path is now relative to the `flownav(.min).js` file meaning as long as this file and the `navbar.json` file are in the same directory, the JS & CSS will work in any document location relative to the root

### Alpha 1.1.1

- The navigation open state is no longer preserved when resizing the screen across the 700px threshold

### Alpha 1.1

- Instead of a border separating menu levels, there is an inset box shadow on the child `<ul>` element
- Navigation menu starts off hidden if the screen resolution is less than `700px`
- Navigation menu toggles when you click the newly implemented `#flownav-hamburger` button
- Animation displays when the `#flownav-hamburger` button is clicked

### Alpha 1.0

- First release of **FlowNav** with the main mechanism of customisable cascading navigation working however the menu is not yet fully responsive as I'd like to incorporate an auto hamburger for tablet/mobile devices.

## Credits

- Just me, Coby Ambrose @ AWG!
  - Website: [ambroseweb.co.uk](https://ambroseweb.co.uk "My Website")
  - Instagram: [@ambroseweb](https://www.instagram.com/ambrosewebgroup/ "My Instagram")
