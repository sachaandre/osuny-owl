import 'dotenv/config';
import { apiPost } from './api/client.js';

export class OsunyOwl {
  constructor(website_id, api_url) {
    this.website_id = website_id;
    this.post_category_ids = [];
    this.portfolio_category_ids = [];
    this.api_key_defined = process.env.OSUNY_API_KEY ? true : false;
    this.api_url = api_url;
    this.last_media = undefined;
  }

  set website_id(website_id) {
    this._website_id = website_id;
  }

  set post_category_ids(category_ids) {
    this._post_category_ids = category_ids;
  }

  set portfolio_category_ids(category_ids){
    this._portfolio_category_ids = category_ids;
  }

  checkApiKey() {
    this.api_key_defined = process.env.OSUNY_API_KEY ? true : false;
  }

  get website_id() {
    return this._website_id;
  }

  get category_ids() {
    return this._category_ids;
  }

  addPostCategory_id(category_id) {
    this.post_category_ids.push(category_id);
  }

  removePostCategory_id(category_id) {
    if (this.post_category_ids.includes(category_id)) {
      this.post_category_ids = this.post_category_ids.filter(e => e !== category_id);
    }
  }

  addPortfolioCategory_id(category_id) {
    this.portfolio_category_ids.push(category_id);
  }

  removePortfolioCategory_id(category_id) {
    if (this.portfolio_category_ids.includes(category_id)) {
      this.portfolio_category_ids = this.portfolio_category_ids.filter(e => e !== category_id);
    }
  }

  async postPostToOsuny(post) {
    if (this.api_key_defined) {
      const url = this.api_url + "/communication/websites/" + this.website_id + "/posts";
      await apiPost(url, post, process.env.OSUNY_API_KEY, false);
      return true;
    } else {
      throw new Error("No API Key Defined");
    }
  }

  async postPortfolioToOsuny(post) {
    if (this.api_key_defined) {
      const url = this.api_url + "/communication/websites/" + this.website_id + "/portfolios";
      await apiPost(url, post, process.env.OSUNY_API_KEY, false);
      return true;
    } else {
      throw new Error("No API Key Defined")
    }
  }

  async importImage(img_bdy) {
    if (this.api_key_defined) {
      const url = this.api_url + "/communication/medias";
      let dataR = await apiPost(url, img_bdy, process.env.OSUNY_API_KEY, true);
      this.last_media = dataR.original_blob;
      return true;
    } else {
      throw new Error("No API Key Defined");
    }
  }
}