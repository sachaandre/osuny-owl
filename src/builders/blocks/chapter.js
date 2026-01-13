export function createChapter(text, migration_identifier, position, title = "", layout = 1) {
  let layout_text;

  switch (layout) {
    case 1:
      layout_text = "no_background";
      break;
    case 2:
      layout_text = "alt_background";
      break;
    case 3:
      layout_text = "accent_background";
      break;
    default:
      layout_text = "no_background";
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
  };
}