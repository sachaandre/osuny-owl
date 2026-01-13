export function createTitle(title, migration_identifier, position, layout = 1) {
  let layout_title;

  switch (layout) {
    case 1:
      layout_title = "classic";
      break;
    case 2:
      layout_title = "collapsed";
      break;
    default:
      layout_title = "classic";
      break;
  }

  return {
    "id": null,
    "migration_identifier": migration_identifier,
    "template_kind": "title",
    "title": title,
    "position": position,
    "published": true,
    "html_class": null,
    "data": {
      "layout": layout_title
    }
  };
}