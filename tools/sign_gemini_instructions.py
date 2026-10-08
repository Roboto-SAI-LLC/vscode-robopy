# Gemini Instruction Signing Utility
# Checksum seal, not a private-key signature.
# Owner: Roberto Villarreal Martinez
# Removes any existing signature_block, hashes the rest, writes a new block.

import json
import hashlib
import datetime
import sys
import os

INPUT_FILE = "gemini_instructions.json"
OUTPUT_FILE = "gemini_instructions_signed.json"
OWNER = "Roberto \u201cBetin\u201d Villarreal Martinez"
SIGNED_BY = "Roboto"
ALGO = "SHA256"


def compute_checksum(data: dict) -> str:
    """Compute SHA256 checksum of dict excluding signature_block."""
    unsigned = dict(data)
    unsigned.pop("signature_block", None)
    encoded = json.dumps(unsigned, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def main():
    if not os.path.exists(INPUT_FILE):
        sys.exit(f"Missing {INPUT_FILE}")
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    checksum = compute_checksum(data)
    timestamp = datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
    data["signature_block"] = {
        "signed_by": SIGNED_BY,
        "owner": OWNER,
        "algorithm": ALGO,
        "checksum": checksum,
        "timestamp": timestamp,
    }
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"Signed instructions written to {OUTPUT_FILE}")
    print(f"Checksum: {checksum}")


if __name__ == "__main__":
    main()
