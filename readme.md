# Osuny Owl

Osuny Owl is a little package that adds a cute owl who can help you talk with an Osuny API.
Still under construction, it's main use is for the creation of large sums of data, or for external apps that want to create posts in a static website. (With Peuplier for exemple)

## Adopt an owl

After installing the package, simply use 

```javascript
const OsunyOwl = require ('osuny-owl')

let myOwl = new OsunyOwl(website_id)
```
Here, `website_id`is the unique identifier of one of your websites.

## The OsunyUtility

To use it in your app, you can import it like this

```javascript
const OsunyUtility = require('osuny-owl/osuny_utility')

let chapterOne = OsunyUtility.createChapter(...)
let datatableOne = OsunyUtility.createDatable(...)
let postOne = OsunyUtility.createPost(...)
```