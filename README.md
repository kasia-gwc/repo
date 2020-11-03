Your challenge is to build out [this](https://www.figma.com/file/fsDB2i81Mp64WBUHH2A7vl/shorter-links?node-id=0%3A1) landing page, integrate with the [shrtcode API](https://app.shrtco.de/) and get it looking as close to the design as possible.


## Todo
- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty


## Building your project

1. Initialize your project as a public repository on [GitHub](https://github.com/).
2. Publish the code to the repository. You will need to initialise git in the project folder first then adding the remote origin while in the terminal.
```
git init
git remote add origin https://github.com/user/repo.git
git add .
git commit -m "initial commit"
git push origin master
```
3. Look through the [design](https://www.figma.com/file/fsDB2i81Mp64WBUHH2A7vl/shorter-links?node-id=0%3A1) to start planning out how you'll tackle the project. This step is crucial to help you think ahead for CSS classes that you could create to make reusable styles.
4. Before adding any styles, structure your content with HTML. Writing your HTML first can help focus your attention on creating well-structured content.
5. Write out the base styles for your project, including general content styles, such as `font-family` and `font-size`.
6. Start adding styles to an external file as `styles.css` then load it in `index.html`.
```
<link rel="stylesheet" href="style.css">
```
7. Use the [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to shorten links. You will need to create an external javascript file to do the logic then load it in the `index.html` just before the closing `</body>` tag.
```
<script src="./app.js">
```

