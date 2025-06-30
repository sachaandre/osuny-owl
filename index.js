import 'dotenv/config'

import fetch from 'node-fetch'

export class OsunyOwl {
    constructor(website_id, api_url){
        this.website_id = website_id
        this.category_ids = []
        this.api_key_defined = process.env.OSUNY_API_KEY ? true : false
        this.api_url = api_url
        this.last_media = undefined
    }

    set website_id(website_id){
        this._website_id = website_id
    }

    set category_ids(category_ids){
        this._category_ids = category_ids
    }

    checkApiKey(){
        this.api_key_defined = process.env.OSUNY_API_KEY ? true : false
    }

    get website_id(){
        return this._website_id
    }

    get category_ids(){
        return this._category_ids
    }

    /**
     * Add a category id to the category_ids array
     * @param {string} category_id id of a Post::Category object in osuny
     */
    addCategory_id(category_id){
        this.category_ids.push(category_id);
    }

    /**
     * Remove given category id of the category_ids array
     * @param {string} category_id id of a Post::Category object in osuny
     */
    removeCategory_id(category_id){
        if (this.category_ids.include(category_id)){
            this.category_ids = this.category_ids.filter(e => e !== category_id)
        }
    }


    /**
     * Async function to post a Communication::Post object to a specific website
     * 
     * @param {Object} post A Communication::Post object for Osuny's websites 
     * @returns Returns true if the operation is succesfull
     */
    async postToOsuny(post){
        if(this.api_key_defined){
            const url = this.api_url + "/communication/websites/" + this.website_id + "/posts"

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                        "X-Osuny-Token": process.env.OSUNY_API_KEY
                    },
                    body: JSON.stringify(post)
                })

                if (!response.ok){
                    throw new Error(`Response status: ${response.status}`)
                } else {
                    return true
                }

            } catch (error) {
                console.error(error.message)
            }
        } else {
            throw new Error("No API Key Defined")
        } 
    }

    async importImage(img_bdy){

        if(this.api_key_defined){
            const url = this.api_url + "/communication/medias"
            
                try {
                const response = await fetch(url, {
                    method: "POST",
                    headers:{
                        "X-Osuny-Token": process.env.OSUNY_API_KEY
                    },
                    body: img_bdy
                })

                if (!response.ok){
                    throw new Error(`Response status: ${response.status}, ${response.statusText}. Error: ${response.text()}`)
                } else {
                    let dataR = await response.json()
                    this.last_media = dataR.original_blob
                    return true
                }
            } catch (error) {
                console.error(error.message)
            }
        } else {
            throw new Error("No API Key Defined")
        }
    }
}

export class OsunyUtility{
    
    /**
     * Create a chapter Block to include in an Osuny's post
     * 
     * @param {string} text - (Required) Main text of the chapter 
     * @param {string} migration_identifier - (Required) a unique migration identifier
     * @param {number} position - (Required) The position of the block. The first element positionned in a post has the value : 0
     * @param {string} title - (Optional) Title of the block, will be displayed as h3 on the website
     * @param {number} layout - Layout of the block. By default set to 1. 1 = no_background, 2 = alt_background, 3 = accent_background
     * @returns Osuny's Communication::Block (Chapter) object
     */
    
    static createChapter(text, migration_identifier, position, title = "", layout = 1){
        // To define the layout kind of the block
        let layout_text;

        switch (layout) {
            case 1:
                layout_text = "no_background"
                break;
            
            case 2:
                layout_text = "alt_background"
                break;

            case 3:
                layout_text = "accent_background"
                break;
        
            default:
                layout_text = "no_background"
                break;
        }

        return {
            "id": null,
            "migration_identifier": migration_identifier,
            "template_kind": "chapter",
            "title": title,
            "position": position,
            "published": true,
            "html_class": null,
            "data": {
                "layout": layout_text,
                "text": text,
            }
        }
    }

    /**
     * Create a Datatable Block to include in an Osuny's Post
     * 
     * @param {Array} table_data (Required) Array of objects with the following form
     *  ```
     *   { cells: [
     *      "value_1",
     *      "value_2"...
     *     ]
     *   }
     * ```
     * - The number of strings in a "cells" array is representative of each cell in a row.
     * @param {Array} table_headers (Required) Array of strings with all the columns header of the datatable
     * @param {string} migration_identifier (Required) a unique migration identifier
     * @param {number} position (Required) The position of the block. The first element positionned in a post has the value : 0
     * @param {string} title (Optional) Title of the block, will be displayed as h3 on the website
     * @param {boolean} alphabetical (Optional) Sort the datable in alphabetical order if set to true. False by default
     * @param {string} caption (Optional) Set the datable caption (usualy after the table). Set to an empty string by default.
     * @returns Osuny's Communication::Block (Datable) object
     */
    
    static createDatatable(table_data, table_headers = [], migration_identifier, position, title = "", alphabetical = false, caption = ""){
        
        return {
            "id": null,
            "migration_identifier": migration_identifier,
            "template_kind": "datatable",
            "title": title,
            "position": position,
            "published": true,
            "html_class": null,
            "data": {
                "columns": table_headers,
                "elements": table_data,
                "alphabetical": alphabetical,
                "caption": caption
            }
        }
    }

    /**
     * Create a Video Block to include in an Osuny's Post
     * 
     * @param {string} video_url (Required) The actual url of the video
     * @param {string} migration_identifier (Required) A unique migration identifier
     * @param {number} position (Required) Position of the block in the post
     * @param {string} video_title Title of the video, will be displayed alongside the media
     * @param {string} video_desc Description of the video, will be displayed as a paragraph alongside the media
     * @param {string} video_transc (Recommended) Transcription of the video
     * @param {string} title (Optional) Title of the block, will be displayed as h3 on the website
     * @returns Osuny's Communication::Block (Video) object
     */
    static createVideo(video_url, migration_identifier, position, video_title = "", video_desc = "", video_transc = "", title = ""){
        return {
            "id": null,
            "migration_identifier": migration_identifier,
            "template_kind": "video",
            "title": title,
            "position": position,
            "published": "true",
            "html_class": null,
            "data": {
                "layout": "player",
                "description": video_desc,
                "url": video_url,
                "video_title": video_title,
                "transcription": video_transc
            }
        }
    }

    /**
     * Create a post Object to publish on a Osuny website
     * 
     * @param {string} title (Required) Title of the article / post 
     * @param {string} migration_identifier (Required) A unique identifier to catch its migration in the logs 
     * @param {Array} blocks (Required) Array of the different Communication::Blocks composing the post 
     * @param {Array} category_ids (Optional) Array of strings representing the category or all the categories attached to this post. Empty Array by default
     * @param {boolean} full_width (Optional) Indicates if the article should take all the theme width. False by default
     * @param {string} summary (Optional) A short text that summerize the post. Empty string by default
     * @returns Osuny's Communication::Post object.
     */
    static createPost(title, migration_identifier, blocks, category_ids = [], full_width=false, summary=""){
        return {
            "id": undefined,
            "migration_identifier": migration_identifier,
            "full_width": full_width,
            "category_ids": category_ids,
            "localizations": {
                "fr": {
                    "id": undefined,
                    "migration_identifier": migration_identifier + "_fr",
                    "title": title,
                    "featured_image": undefined,
                    "pinned": false,
                    "published": true,
                    "published_at": undefined,
                    "slug": this.slugify(title),
                    "summary": summary,
                    "blocks": blocks,
                    "created_at": undefined
                }
            }

        }
    }

    /**
     * 
     * @param  {...Object} osunyBlocks Osuny's Communication::Block in JSON.
     * @returns Array of Osuny's Communication::Block, usable as an argument for the createPost method.
     */
    static composePost(...osunyBlocks){
        let blocksArray = []
        osunyBlocks.forEach((el) => {
            blocksArray.push(el)
        })

        return blocksArray
    }

    static slugify(str){
        // Code taken from the following article : https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n

        str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
        str = str.toLowerCase(); // convert string to lowercase
        str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
                .replace(/\s+/g, '-') // replace spaces with hyphens
                .replace(/-+/g, '-'); // remove consecutive hyphens
        return str;
    }
}



