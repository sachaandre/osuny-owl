module.exports = class OsunyOwl {
    constructor(website_id, api_url){
        this.website_id = website_id
        this.category_ids = []
        this.api_key_defined = process.env.OSUNY_API_KEY ? true : false
        this.api_url = api_url
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
     * TODO
     * 
     *  - function : postToOsuny(Communication::Post object)
     *          * Vérifier la connexion API
     *          * Vérifier qu'il y ait un site
     * 
     */

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
}



