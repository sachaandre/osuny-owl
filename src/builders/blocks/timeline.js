export function createTimeline(timeline_elements, migration_identifier, position, title = "", layout=1){
    let layout_text;

    switch (layout) {
    case 1:
      layout_text = "vertical";
      break;
    case 2:
      layout_text = "horizontal";
      break;
    default:
      layout_text = "vertical";
      break;
  }

    return {
        "id":null,
        "migration_identifier": migration_identifier,
        "template_kind": "timeline",
        "title": title,
        "position": position,
        "published": true,
        "html_class": null,
        "data": {
            "layout": layout_text,
            "text": timeline_elements
        }

    }
}