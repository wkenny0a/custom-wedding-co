from PIL import Image
import numpy as np
import sys

# Load original logo
img = Image.open('public/assets/logo.png').convert('RGB')
gray = img.convert('L')
data = np.array(gray)

# find min and max luminance to create a smooth alpha mask
bg_lum = np.percentile(data, 95)
text_lum = np.percentile(data, 1)

# normalize alpha
alpha = (bg_lum - data) / (bg_lum - text_lum)
alpha = np.clip(alpha, 0, 1) * 255
alpha = alpha.astype(np.uint8)

# Brand color #4A2C2A is (74, 44, 42)
rgba = np.zeros((data.shape[0], data.shape[1], 4), dtype=np.uint8)
rgba[:,:,0] = 74
rgba[:,:,1] = 44
rgba[:,:,2] = 42
rgba[:,:,3] = alpha

out = Image.fromarray(rgba)

# Crop to bounding box of visible text
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)

# Add minimal padding
padding = 10
out_padded = Image.new('RGBA', (out.width + padding*2, out.height + padding*2), (0,0,0,0))
out_padded.paste(out, (padding, padding))

out_padded.save('public/assets/logo.png')
print(f"SUCCESS: {out_padded.width}x{out_padded.height}")
