# Genera variantes WebP para el sitio. Requiere Python y Pillow.
from pathlib import Path

from PIL import Image, ImageOps

# Resuelve las rutas desde el script para ejecutarlo desde cualquier directorio.
ROOT = Path(__file__).resolve().parent.parent
SOURCE_IMAGE = ROOT / "assets/images/provider-1.webp"

# Generar imágenes pequeñas manteniendo la original.
with Image.open(SOURCE_IMAGE) as source:
    # Aplica la orientación EXIF y conserva transparencia mediante el canal alfa.
    source = ImageOps.exif_transpose(source).convert("RGBA")

    # Tarjeta: 80 px; detalle: 160 px; pantalla de alta densidad: hasta 320 px.
    for size in (80, 160, 320):
        # Recorta al centro sin deformar las proporciones de la imagen.
        variant = ImageOps.fit(
            source,
            (size, size),
            method=Image.Resampling.LANCZOS,
        )

        destination = (
            ROOT / f"assets/images/provider-1-{size}.webp"
        )

        # Sobrescribe solo las variantes, manteniendo la imagen original.
        variant.save(destination, "WEBP", quality=80, method=6)
        print(f"Generado: {destination.relative_to(ROOT)}")
