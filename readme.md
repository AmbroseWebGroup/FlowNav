# FlowNav

A prebuilt cascading navigation menu in vanilla HTML, CSS & JS with recursively defined dropdowns and hyperlinks, purpose-built to support all modern browsers and all scren sizes and written to be customisable in style, contact and functionality.

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

1. Add this line of code  somewhere inside the `<body>` tag where you'd like the navigation menu to appear
```HTML
<nav id="flownav"></nav>
```

1. Add this line of code somewhere inside the `<body>` tag where you'd like the mobile menu button to appear
```HTML
<button id="flownav-hamburger"></button>
```


1. Edit the `navbar.json` file to contain your desired navigation layout based on the template provided. You can nest as many times as you want!
```json
{
  "Top Item 1": {
    "Sub Item 1": "./link-to-relative-file/",
    "Sub Item 2": "http://linktosub.item/2"
  },
  "Top Item 2": "http://linktotop.item/2"
}
```

1. And you're done!

## Known Issues

- **Trailing commas in `navbar.json`:** Please make sure that you parse your JSON file before testing the system. If the file has trailing commas at the end of an array/dictionary, the JSON will not parse during the XMLHttpRequest and will throw an error making the navigation structure unreadable.

## Changelog

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
