# Titanic

A collection of animated icons + javascript library.

![Preview](/docs/images/animated-icons-preview.gif)

**[Preview all icons](https://rawgit.com/icons8/titanic/master/demo/index.html)**

## Installation

You can install it either via CDN or npm.

### CDN

Insert this string to your HTML head:
```html
<script src="https://cdn.rawgit.com/icons8/titanic/master/dist/js/titanic.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/4.5.9/bodymovin.min.js"></script>
```
And initialize it before the body closes:

```html
<script>
    var titanic = new Titanic();
</script>
```
This way, you can add icons anywhere in your HTML using this tag:
```html
<div class='titanic titanic_chat'></div>
```
Where chat can be any of these:
* caps
* chat
* checkbox
* expand
* cheap
* expensive
* idea
* mailbox
* mic
* no-mic
* online
* pause
* power
* shopping
* smile
* stop
* unlock
* zoom

### Hosting your images

If you'd like to host your images on your server instead of rawgit, pass the base URL with the init() function:
```javascript
titanic.begin('/my/base/directory/');
```
Then, if you have a div with id="chat", Titanic will search for icons in /my/base/directory/chat.json.

## npm

```
npm install titanic-icons --save
```

## API

* ```titanic.isInitialized()``` -- just true/false flag

* ```titanic.items``` -- list of titanic items
* ```titanic.items[index].on(), titanic.items[index].off(), titanic.items[index].play()``` -- play animations of the titanic item by index
* ```titanic.on(token), titanic.off(token), titanic.play(token)``` -- play animations of the titanic item by token (name)

## Example

```html
<head>
    <!--Inserting the scripts once for the whole page-->
    <script src="https://cdn.rawgit.com/icons8/titanic/master/dist/js/titanic.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/4.5.9/bodymovin.min.js"></script>
</head>
<body>
    <!--Inserting an icon-->
    <div class='titanic titanic-checkbox'></div>

    <!--Initializing-->
    <script>
        var titanic = new Titanic({
          hover: true, // auto animated on hover (default true)
          click: true  // auto animated on click/tap (default false)
        });
    </script>

    <!--Clicking turns this icon on-->
    <button onclick="titanic.on(getElementById('checkbox').value)">On</button>
</body>
```

## Credits
JavaScript is basically [bodymovin](https://github.com/bodymovin/bodymovin) plus few lines of my code. It's a solid library with an awesome name. Thank you, guys.

Icons are created by [Margarita Ivanchikova](https://dribbble.com/imargarita) from [Icons8](https://icons8.com/). She has many more awesome animations in her portfolio.

The code rewritten by [Denis Alexanov](https://github.com/dhilt), my teacher and guru. Thank you!

Project is produced by Icons8, author of the famous icon library, [IconPharm](https://iconpharm.com), and [Sleek Logos](https://sleeklogos.design).

The code is created by Icons8 

![Magritte](/docs/images/magritte.gif)
