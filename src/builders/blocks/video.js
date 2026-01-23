export function createVideo(video_url, migration_identifier, position, video_title = "", video_desc = "", video_transc = "", title = "") {
  return {
    "id": null,
    "migration_identifier": migration_identifier,
    "template_kind": "video",
    "title": title,
    "position": position,
    "published": true,
    "html_class": null,
    "data": {
      "layout": "player",
      "description": video_desc,
      "url": video_url,
      "video_title": video_title,
      "transcription": video_transc
    }
  };
}