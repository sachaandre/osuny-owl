import { slugify } from '../utils/slug.js';

export function createPost(title, migration_identifier, blocks, locale = "fr", category_ids = [], crea_dt = undefined, full_width = false, summary = "") {
  return {
    "id": undefined,
    "migration_identifier": migration_identifier,
    "full_width": full_width,
    "category_ids": category_ids,
    "localizations": {
      [locale]: {
        "id": undefined,
        "migration_identifier": migration_identifier + `_${locale}`,
        "title": title,
        "featured_image": undefined,
        "pinned": false,
        "published": true,
        "published_at": crea_dt,
        "slug": slugify(title),
        "summary": summary,
        "blocks": blocks,
        "created_at": crea_dt
      }
    }
  };
}

export function createProject(title, migration_identifier, year, blocks, locale = "fr", category_ids = [], full_width = true, crea_dt = undefined, summary = "") {
  return {
    "id": undefined,
    "migration_identifier": migration_identifier,
    "full_width": full_width,
    "year": year,
    "category_ids": category_ids,
    "localizations": {
      [locale]: {
        "id": null,
        "migration_identifier": migration_identifier + `_${locale}`,
        "title": title,
        "featured_image": null,
        "pinned": false,
        "published": true,
        "published_at": crea_dt,
        "slug": slugify(title),
        "summary": summary,
        "blocks": blocks,
        "created_at": crea_dt
      }
    }
  };
}

/**
 * Ajoute une localisation à un post existant
 * 
 * @param {Object} post - Le post existant (créé avec createPost)
 * @param {string} locale - Code de la locale (ex: "en", "es", "de")
 * @param {string} title - Titre dans la nouvelle locale
 * @param {Array} blocks - Blocs dans la nouvelle locale
 * @param {string} summary - Résumé dans la nouvelle locale (optionnel)
 * @param {Date} crea_dt - Date de création (optionnel)
 * @returns {Object} Le post modifié avec la nouvelle locale
 */
export function addLocaleToPost(post, locale, title, blocks, summary = "", crea_dt = undefined) {
  // Ajouter la nouvelle locale dans l'objet localizations
  post.localizations[locale] = {
    "id": undefined,
    "migration_identifier": post.migration_identifier + `_${locale}`,
    "title": title,
    "featured_image": undefined,
    "pinned": false,
    "published": true,
    "published_at": crea_dt,
    "slug": slugify(title),
    "summary": summary,
    "blocks": blocks,
    "created_at": crea_dt
  };
  
  return post;
}

/**
 * Ajoute une localisation à un projet existant
 * 
 * @param {Object} project - Le projet existant (créé avec createProject)
 * @param {string} locale - Code de la locale (ex: "en", "es", "de")
 * @param {string} title - Titre dans la nouvelle locale
 * @param {Array} blocks - Blocs dans la nouvelle locale
 * @param {string} summary - Résumé dans la nouvelle locale (optionnel)
 * @param {Date} crea_dt - Date de création (optionnel)
 * @returns {Object} Le projet modifié avec la nouvelle locale
 */
export function addLocaleToProject(project, locale, title, blocks, summary = "", crea_dt = undefined) {
  // Ajouter la nouvelle locale dans l'objet localizations
  project.localizations[locale] = {
    "id": undefined,
    "migration_identifier": project.migration_identifier + `_${locale}`,
    "title": title,
    "featured_image": undefined,
    "pinned": false,
    "published": true,
    "published_at": crea_dt,
    "slug": slugify(title),
    "summary": summary,
    "blocks": blocks,
    "created_at": crea_dt
  };
  
  return project;
}

export function composePost(...osunyBlocks) {
  let blocksArray = [];
  osunyBlocks.forEach((el) => {
    blocksArray.push(el);
  });
  return blocksArray;
}