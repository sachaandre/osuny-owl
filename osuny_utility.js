module.exports = class OsunyUtility{
    
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
            id: null,
            migration_identifier: migration_identifier,
            template_kind: "chapter",
            title: title,
            position: position,
            published: true,
            html_class: null,
            data: {
                layout: layout_text,
                text: text,
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
     * @param {*} migration_identifier (Required) a unique migration identifier
     * @param {*} position (Required) The position of the block. The first element positionned in a post has the value : 0
     * @param {*} title (Optional) Title of the block, will be displayed as h3 on the website
     * @returns Osuny's Communication::Block (Datable) object
     */
    
    static createDatatable(table_data, table_headers = [], migration_identifier, position, title = ""){
        
        return {
            id: null,
            migration_identifier: migration_identifier,
            template_kind: "datatable",
            title: title,
            position: position,
            published: true,
            html_class: null,
            data: {
                layout: layout_text,
                columns: table_headers,
                elements: table_data,
                alphabetical: alphabetical
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
            id: null,
            migration_identifier: migration_identifier,
            full_width: full_width,
            category_ids: category_ids,
            localization: {
                fr: {
                    id: null,
                    migration_identifier: migration_identifier + "_fr",
                    title: title,
                    featured_image: null,
                    pinned: false,
                    published: true,
                    published_at: null,
                    slug: slugify(title),
                    summary: summary,
                    blocks: blocks,
                    created_at: undefined
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

    slugify(str){
        // Code taken from the following article : https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n

        str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
        str = str.toLowerCase(); // convert string to lowercase
        str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
                .replace(/\s+/g, '-') // replace spaces with hyphens
                .replace(/-+/g, '-'); // remove consecutive hyphens
        return str;
    }
}