from pathlib import Path
import unittest


LAYOUT = Path(__file__).parents[1] / "app" / "layout.tsx"


class BrandingTests(unittest.TestCase):
    def test_application_metadata_uses_kidswell_brand(self):
        source = LAYOUT.read_text(encoding="utf-8")

        self.assertIn('title: "Kidswell"', source)
        self.assertNotIn('title: "Learnwell"', source)
