class OsunyOwl {
    constructor(website_id){
        this.website_id = website_id
        this.category_ids = []
    }

    set website_id(website_id){
        this._website_id = website_id
    }

    set category_ids(category_ids){
        this._category_ids = category_ids
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
     * 
     * @param {string} text - (Required) Main text of the chapter 
     * @param {string} migration_identifier - (Required) a unique migration identifier
     * @param {nunmer} position - (Required) The position of the block. The first element positionned in a post has the value : 0
     * @param {string} title - (Optional) Title of the block, will be displayed as h3 on the website
     * @param {number} layout - Layout of the block. By default set to 1. 1 = no_background, 2 = alt_background, 3 = accent_background
     * @returns Osuny's Communication::Block (Chapter) - JSON
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
     * @returns Osuny's Communication::Block (Datable) - JSON
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

    static createPost(title, migration_identifier, category_ids = [], full_width=false){
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
                }
            }

        }
    }
}