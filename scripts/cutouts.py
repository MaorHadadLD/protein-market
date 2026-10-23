"""Derive transparent cutouts from the white-background Open Food Facts packshots.

The background is removed by flood-filling near-white pixels from the image border
(the pack itself is never recoloured, cropped or retouched), then the alpha edge is
softened by one pixel so the cutout sits cleanly on a coloured ground.

Usage: python3 scripts/cutouts.py   (needs Pillow; writes public/products/cutouts/*.webp)
"""
from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter

SRC = Path(__file__).resolve().parent.parent / "public" / "products"
OUT = SRC / "cutouts"

# Packshots shot on white. Box fronts (Quest, Grenade, Fulfil 12-pack) are already
# cropped to the box edge and stay rectangular. Myprotein's white pouch and Yalla's
# white cap have no edge against the white background, so they stay as photos.
FILES = [
    "scitec-100-whey-isolate-strawberry-2kg",
    "nu3-performance-whey-strawberry-1kg",
    "yfood-crazy-coconut-500ml",
    "yfood-heavenly-hazelnut-500ml",
    "weider-yippie-chocolate-lava-70g",
    "weider-60-protein-bar-cookies-cream-45g",
    "fulfil-chocolate-salted-caramel-40g",
]

THRESHOLD = 253  # every channel above this counts as background white (lower values eat white caps)
HALO = 222  # light edge pixels next to the background that are removed (two pixels deep at most)


def matte(im: Image.Image) -> Image.Image:
    rgb = im.convert("RGB")
    w, h = rgb.size
    px = rgb.load()
    bg = bytearray(w * h)
    q = deque()
    for x in range(w):
        q.extend(((x, 0), (x, h - 1)))
    for y in range(h):
        q.extend(((0, y), (w - 1, y)))
    while q:
        x, y = q.popleft()
        i = y * w + x
        if bg[i] or min(px[x, y]) < THRESHOLD:
            continue
        bg[i] = 1
        if x > 0: q.append((x - 1, y))
        if x < w - 1: q.append((x + 1, y))
        if y > 0: q.append((x, y - 1))
        if y < h - 1: q.append((x, y + 1))
    # JPEG noise leaves a light-grey halo just inside the fill: let the background take
    # light pixels that touch it, for two pixels at most, so caps and edges stay intact.
    for _ in range(2):
        grow = []
        for y in range(1, h - 1):
            row = y * w
            for x in range(1, w - 1):
                i = row + x
                if bg[i] or min(px[x, y]) < HALO:
                    continue
                if bg[i - 1] or bg[i + 1] or bg[i - w] or bg[i + w]:
                    grow.append(i)
        for i in grow:
            bg[i] = 1
    alpha = Image.frombytes("L", (w, h), bytes(0 if b else 255 for b in bg))
    # Pull the edge in by a pixel, then feather it, so no white fringe survives.
    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    out = rgb.convert("RGBA")
    out.putalpha(alpha)
    return out.crop(out.getbbox())


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for name in FILES:
        cut = matte(Image.open(SRC / f"{name}.jpg"))
        cut.save(OUT / f"{name}.webp", quality=90, method=6)
        print(f"{name}: {cut.size[0]}x{cut.size[1]}")
