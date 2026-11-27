"""Render the medal-front portrait for the website (src/img/portrait-ribbentrop.png).

Same crop and smoothing as the 3D model in private-docs (make_medal.py), shaded as a
bronze relief lit from the top left, inside a soft-edged oval. Re-run after changing
the crop:  python3 scripts/make-portrait.py   (needs numpy, pillow, matplotlib)
"""
import numpy as np
from PIL import Image, ImageFilter, ImageOps
from matplotlib.colors import LightSource

SRC = "assets-src/ribbentrop-dock-1946.jpg"   # Ribbentrop seated in the dock, 1946 (public domain)
OUT = "src/img/portrait-ribbentrop.png"
BOX = (136, 424, 292, 619)                     # head and shoulders, 4:5
W, H = 390, 480                                # 3x the 130x160 CSS frame

img = Image.open(SRC).convert("L").crop(BOX)
img = ImageOps.autocontrast(img, cutoff=1).resize((W, H), Image.LANCZOS)
img = img.filter(ImageFilter.MedianFilter(7)).filter(ImageFilter.GaussianBlur(3.5))
g = np.asarray(img, dtype=float) / 255.0
height = g ** 1.2

shade = LightSource(azdeg=315, altdeg=50).hillshade(height, vert_exag=60, dx=1, dy=1)
v = np.clip(0.55 * shade + 0.45 * height, 0, 1)

# Bronze ramp: medal ground -> mid bronze -> highlight
stops = np.array([[0x2B, 0x26, 0x22], [0x8C, 0x73, 0x56], [0xE6, 0xCC, 0xA0]], dtype=float)
lo = np.clip(v * 2, 0, 1)[..., None]
hi = np.clip(v * 2 - 1, 0, 1)[..., None]
rgb = np.where(v[..., None] < 0.5, stops[0] + (stops[1] - stops[0]) * lo, stops[1] + (stops[2] - stops[1]) * hi)

yy, xx = np.mgrid[0:H, 0:W]
r = np.sqrt(((xx - (W - 1) / 2) / (W / 2)) ** 2 + ((yy - (H - 1) / 2) / (H / 2)) ** 2)
alpha = np.clip((1.0 - r) / 0.04, 0, 1) * 255

Image.fromarray(np.dstack([rgb, alpha]).astype(np.uint8), "RGBA").save(OUT, optimize=True)
print("wrote", OUT)
