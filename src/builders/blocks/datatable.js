export function createDatatable(table_data, table_headers = [], migration_identifier, position, title = "", alphabetical = false, caption = "") {
  return {
    "id": null,
    "migration_identifier": migration_identifier,
    "template_kind": "datatable",
    "title": title,
    "position": position,
    "published": true,
    "html_class": null,
    "data": {
      "columns": table_headers,
      "elements": table_data,
      "alphabetical": alphabetical,
      "caption": caption
    }
  };
}