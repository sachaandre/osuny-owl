# Osuny Owl

Osuny Owl is a little package that adds a cute owl who can help you talk with an Osuny API.
Still under construction, it's main use is for the creation of large sums of data, or for external apps that want to create posts in a static website. (With Peuplier for exemple)

>[!NOTE]
> This package is for the moment usable only for websites localized in french.

## Adopt an owl

After installing the package, simply use 

```javascript
import { OsunyOwl } from 'osuny-owl';

let myOwl = new OsunyOwl(website_id, api_url)
```
Here, `website_id` is the unique identifier of one of your websites and `api_url` the url of your Osuny Instance API

## The OsunyUtility

> [!NOTE]
> The Utility is for the moment very limited. Images are not supported for the moment

To use it in your app, you can import it like this

```javascript
import { OsunyUtility } from 'osuny-owl';

let chapterOne = OsunyUtility.createChapter(...)
let datatableOne = OsunyUtility.createDatable(...)
let postOne = OsunyUtility.createPost(...)
```