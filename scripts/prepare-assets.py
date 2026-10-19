from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE_IMAGE = ROOT / "assets/images/provider-1.webp"

# Generar imágenes pequeñas manteniendo la original.
with Image.open(SOURCE_IMAGE) as source:
    source = ImageOps.exif_transpose(source).convert("RGBA")

    for size in (80, 160, 320):
        variant = ImageOps.fit(
            source,
            (size, size),
            method=Image.Resampling.LANCZOS,
        )

        destination = (
            ROOT / f"assets/images/provider-1-{size}.webp"
        )

        variant.save(destination, "WEBP", quality=80, method=6)
        print(f"Generado: {destination.relative_to(ROOT)}")
