from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

try:
    from pypdf import PdfReader, PdfWriter
except ImportError as exc:  # pragma: no cover - handled at runtime
    raise SystemExit(
        "Missing dependency `pypdf`. Install it with `python3 -m pip install -r server/requirements.txt`."
    ) from exc


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Write outline/bookmark data back into an existing PDF document."
    )
    parser.add_argument("--input-file", required=True, help="Path to the source PDF file.")
    parser.add_argument("--output-file", required=True, help="Path for the exported PDF file.")
    parser.add_argument("--outline-file", required=True, help="Path to the outline JSON payload.")
    parser.add_argument("--document-file", required=True, help="Path to the document JSON payload.")
    return parser.parse_args()


def load_json(path: str) -> Any:
    return json.loads(Path(path).read_text(encoding="utf-8"))


def to_metadata_dict(metadata: Any) -> dict[str, str]:
    if metadata is None:
        return {}

    normalized: dict[str, str] = {}

    for key, value in dict(metadata).items():
        if value is None:
            continue
        normalized[str(key)] = str(value)

    return normalized


def normalize_level(raw_level: Any, parents_by_level: dict[int, Any]) -> int:
    try:
        level = max(1, int(raw_level))
    except (TypeError, ValueError):
        level = 1

    while level > 1 and (level - 1) not in parents_by_level:
        level -= 1

    return level


def normalize_page_number(raw_page_number: Any, page_count: int) -> int:
    try:
        page_number = int(raw_page_number)
    except (TypeError, ValueError):
        page_number = 1

    page_number = max(1, min(page_count, page_number))
    return page_number - 1


def add_outline(writer: PdfWriter, outline_items: list[dict[str, Any]], page_count: int) -> None:
    parents_by_level: dict[int, Any] = {}

    for item in outline_items:
        title = str(item.get("title", "")).strip() or "Untitled section"
        level = normalize_level(item.get("level", 1), parents_by_level)
        page_number = normalize_page_number(item.get("pageNumber", 1), page_count)
        parent = parents_by_level.get(level - 1)

        outline_ref = writer.add_outline_item(
            title=title,
            page_number=page_number,
            parent=parent,
        )

        parents_by_level[level] = outline_ref
        stale_levels = [existing_level for existing_level in parents_by_level if existing_level > level]

        for stale_level in stale_levels:
            del parents_by_level[stale_level]


def main() -> int:
    args = parse_args()
    input_path = Path(args.input_file)
    output_path = Path(args.output_file)
    outline_payload = load_json(args.outline_file)
    _document_payload = load_json(args.document_file)

    reader = PdfReader(str(input_path))

    if reader.is_encrypted:
        raise SystemExit("Encrypted PDFs are not supported by this exporter yet.")

    writer = PdfWriter()
    writer.append(reader, import_outline=False)

    metadata = to_metadata_dict(reader.metadata)
    if metadata:
        writer.add_metadata(metadata)

    outline_items = outline_payload if isinstance(outline_payload, list) else []
    add_outline(writer, outline_items, len(reader.pages))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("wb") as output_stream:
        writer.write(output_stream)

    summary = {
        "outlineCount": len(outline_items),
        "outputFile": str(output_path),
        "pageCount": len(reader.pages),
        "status": "ok",
    }
    sys.stdout.write(json.dumps(summary))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
