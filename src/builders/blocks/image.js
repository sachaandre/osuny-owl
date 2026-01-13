export function createImage(img_id, img_filename, img_signedid, migration_identifier, position, alt = "", credit = "", text = "", title = "") {
  return {
    "id": null,
    "migration_identifier": migration_identifier,
    "template_kind": "image",
    "title": title,
    "position": position,
    "published": "true",
    "html_class": null,
    "data": {
      "image": {
        "id": img_id,
        "filename": img_filename,
        "signed_id": img_signedid
      },
      "alt": alt,
      "credit": credit,
      "text": text
    }
  };
}