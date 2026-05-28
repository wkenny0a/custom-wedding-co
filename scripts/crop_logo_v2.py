from PIL import Image
import numpy as np
import sys

# Load original logo
img = Image.open('public/assets/logo.png').convert('RGB')
gray = img.convert('L')
data = np.array(gray)

# find min and max luminance
bg_lum = np.percentile(data, 95)
text_lum = np.percentile(data, 1)

# create a sharp mask for bounding box
# anything darker than background by 15 units is text
is_text = data < (bg_lum - 15)

# get bounding box of True values in is_text
rows = np.any(is_text, axis=1)
cols = np.any(is_text, axis=0)

if not np.any(rows) or not np.any(cols):
    print("Error: Could not find text")
    sys.exit(1)

ymin, ymax = np.where(rows)[0][[0, -1]]
xmin, xmax = np.where(cols)[0][[0, -1]]

# crop the image array
cropped_rgb = np.array(img)[ymin:ymax+1, xmin:xmax+1]
cropped_gray = data[ymin:ymax+1, xmin:xmax+1]

# Re-calculate alpha on the cropped region for smooth edges
alpha = (bg_lum - cropped_gray) / (bg_lum - text_lum)
alpha = np.clip(alpha, 0, 1) * 255
alpha = alpha.astype(np.uint8)

# Brand color #4A2C2A is (74, 44, 42)
rgba = np.zeros((cropped_gray.shape[0], cropped_gray.shape[1], 4), dtype=np.uint8)
rgba[:,:,0] = 74
rgba[:,:,1] = 44
rgba[:,:,2] = 42
rgba[:,:,3] = alpha

# erase semi-transparent artifacts (alpha < 30)
rgba[alpha < 30, 3] = 0

out = Image.fromarray(rgba)

# Add minimal padding
padding = 10
out_padded = Image.new('RGBA', (out.width + padding*2, out.height + padding*2), (0,0,0,0))
out_padded.paste(out, (padding, padding))

out_padded.save('public/assets/logo.png')
print(f"SUCCESS: {out_padded.width}x{out_padded.height}")
