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

export function composePost(...osunyBlocks) {
  let blocksArray = [];
  osunyBlocks.forEach((el) => {
    blocksArray.push(el);
  });
  return blocksArray;
}