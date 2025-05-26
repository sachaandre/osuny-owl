module.exports = class OsunyOwl {
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

}



