import json

out_path = r'C:\Users\HP\.gemini\antigravity\scratch\matrix-web\assets\human_face_points.json'
with open(out_path, 'r') as f:
    points = json.load(f)

min_x = min(p['x'] for p in points)
max_x = max(p['x'] for p in points)
min_y = min(p['y'] for p in points)
max_y = max(p['y'] for p in points)
min_z = min(p['z'] for p in points)
max_z = max(p['z'] for p in points)

cx = (min_x + max_x) / 2
cy = (min_y + max_y) / 2
cz = (min_z + max_z) / 2

scale = max(max_x - min_x, max_y - min_y, max_z - min_z)

# We want the final normalized coordinates:
# Web: +X is right, +Y is DOWN (but avatar JS handles Y down), let's just make it a standard 3D space:
# +X right, +Y UP, +Z FRONT (towards camera).
# Let's see the OBJ front. Usually -Z or +Z is front.
# We'll export nx, ny, nz as standardized 3D points.
normalized_points = []
for p in points:
    # Normalize position to [-0.5, 0.5]
    nx = (p['x'] - cx) / scale
    ny = (p['y'] - cy) / scale
    nz = (p['z'] - cz) / scale
    
    # We'll just pass these straight to the JS and let JS handle the mapping.
    normalized_points.append({
        'x': nx,
        'y': ny,
        'z': nz,
        'nx': p['nx'],
        'ny': p['ny'],
        'nz': p['nz']
    })

with open(out_path, 'w') as f:
    json.dump(normalized_points, f)
print('Normalized and saved.')
