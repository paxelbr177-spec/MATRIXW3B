import json
import random
import math

obj_path = r'C:\Users\HP\Downloads\face\source\source\0dcf062f88e741beac28166787231306.obj'

vertices = []
normals = []
faces = []

print('Parsing OBJ...')
with open(obj_path, 'r') as f:
    for line in f:
        parts = line.strip().split()
        if not parts:
            continue
        if parts[0] == 'v':
            vertices.append((float(parts[1]), float(parts[2]), float(parts[3])))
        elif parts[0] == 'vn':
            normals.append((float(parts[1]), float(parts[2]), float(parts[3])))
        elif parts[0] == 'f':
            face_verts = []
            face_norms = []
            for p in parts[1:]:
                vals = p.split('/')
                v_idx = int(vals[0]) - 1
                face_verts.append(v_idx)
                if len(vals) >= 3 and vals[2]:
                    face_norms.append(int(vals[2]) - 1)
                else:
                    face_norms.append(None)
            faces.append((face_verts, face_norms))

print(f'Found {len(vertices)} vertices, {len(faces)} faces.')

def cross_product(v1, v2):
    return (v1[1]*v2[2] - v1[2]*v2[1],
            v1[2]*v2[0] - v1[0]*v2[2],
            v1[0]*v2[1] - v1[1]*v2[0])

def normalize(v):
    l = math.sqrt(v[0]**2 + v[1]**2 + v[2]**2)
    if l == 0: return (0,0,0)
    return (v[0]/l, v[1]/l, v[2]/l)

triangles = []
for f_v, f_n in faces:
    # triangulate polygon
    for i in range(1, len(f_v) - 1):
        v0 = vertices[f_v[0]]
        v1 = vertices[f_v[i]]
        v2 = vertices[f_v[i+1]]
        
        # Calculate area
        edge1 = (v1[0]-v0[0], v1[1]-v0[1], v1[2]-v0[2])
        edge2 = (v2[0]-v0[0], v2[1]-v0[1], v2[2]-v0[2])
        cp = cross_product(edge1, edge2)
        area = 0.5 * math.sqrt(cp[0]**2 + cp[1]**2 + cp[2]**2)
        
        n0 = normals[f_n[0]] if f_n[0] is not None else normalize(cp)
        n1 = normals[f_n[i]] if f_n[i] is not None else normalize(cp)
        n2 = normals[f_n[i+1]] if f_n[i+1] is not None else normalize(cp)
        
        triangles.append((area, v0, v1, v2, n0, n1, n2))

total_area = sum(t[0] for t in triangles)
print(f'Total area: {total_area}, Triangles: {len(triangles)}')

def sample_triangle(t):
    area, v0, v1, v2, n0, n1, n2 = t
    r1 = random.random()
    r2 = random.random()
    if r1 + r2 > 1.0:
        r1 = 1.0 - r1
        r2 = 1.0 - r2
    
    r0 = 1.0 - r1 - r2
    
    p = (r0*v0[0] + r1*v1[0] + r2*v2[0],
         r0*v0[1] + r1*v1[1] + r2*v1[1], # Wait, v1[1] and v2[1] bug! Fixing:
         r0*v0[2] + r1*v1[2] + r2*v2[2])
    
    # Actually rewrite correctly:
    px = r0*v0[0] + r1*v1[0] + r2*v2[0]
    py = r0*v0[1] + r1*v1[1] + r2*v2[1]
    pz = r0*v0[2] + r1*v1[2] + r2*v2[2]
    
    nx = r0*n0[0] + r1*n1[0] + r2*n2[0]
    ny = r0*n0[1] + r1*n1[1] + r2*n2[1]
    nz = r0*n0[2] + r1*n1[2] + r2*n2[2]
    nn = normalize((nx, ny, nz))
    
    return {'x': px, 'y': py, 'z': pz, 'nx': nn[0], 'ny': nn[1], 'nz': nn[2]}

# Weighted choice
cumulative_areas = []
c = 0
for t in triangles:
    c += t[0]
    cumulative_areas.append(c)

import bisect

points = []
TARGET_POINTS = 8000
print(f'Sampling {TARGET_POINTS} points...')
for _ in range(TARGET_POINTS):
    r = random.uniform(0, total_area)
    idx = bisect.bisect_left(cumulative_areas, r)
    if idx >= len(triangles): idx = len(triangles) - 1
    pt = sample_triangle(triangles[idx])
    points.append(pt)

out_path = r'C:\Users\HP\.gemini\antigravity\scratch\matrix-web\assets\human_face_points.json'
with open(out_path, 'w') as f:
    json.dump(points, f)
print('Done!')
