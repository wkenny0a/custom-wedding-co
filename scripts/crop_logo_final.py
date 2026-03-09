from PIL import Image, ImageOps
import numpy as np

# Load original logo
img = Image.open('/Users/kenny/.gemini/antigravity/brain/f7b8be5c-e7e0-4d6c-8c2f-e2a741218708/custom_wedding_co_logo_wide_1772939735856.png').convert('RGB')
gray = img.convert('L')

# Create mask for text
bw = gray.point(lambda x: 0 if x < 200 else 255, '1')
bw_inv = ImageOps.invert(bw.convert('L'))

bbox = bw_inv.getbbox()
if not bbox:
    print("Could not find text bounding box!")
    exit(1)

# crop the image
cropped_gray = np.array(gray)[bbox[1]:bbox[3], bbox[0]:bbox[2]]

# map grayscale [0, 255] directly into alpha [255, 0] (since text is dark, background is light)
# to keep text sharp, we invert the cropped gray to act as alpha
alpha = 255 - cropped_gray
# remove low-opacity noise from background
alpha[alpha < 100] = 0

rgba = np.zeros((cropped_gray.shape[0], cropped_gray.shape[1], 4), dtype=np.uint8)
# Espresso brown text
rgba[:,:,0] = 74
rgba[:,:,1] = 44
rgba[:,:,2] = 42
rgba[:,:,3] = alpha

out = Image.fromarray(rgba)

# Add minimal padding
padding = 10
out_padded = Image.new('RGBA', (out.width + padding*2, out.height + padding*2), (0,0,0,0))
out_padded.paste(out, (padding, padding))

out_padded.save('public/assets/logo.png')
print(f"SUCCESS: {out_padded.width}x{out_padded.height}")
