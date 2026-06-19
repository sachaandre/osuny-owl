export function createEmbed(code, transcription, migration_identifier, position, title = "", transcription_title = "") {
    return {
        "id": null,
        "migration_identifier": migration_identifier,
        "template_kind": "embed",
        "title": title,
        "position": position,
        "published": true,
        "html_class": null,
        "data": {
            "code": code,
            "transcription": transcription,
            "transcription_title": transcription_title
        }
    }
}