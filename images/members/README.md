# Members Avatar Images

This directory contains avatar images for team members.

## Adding New Avatar Images

1. Place your avatar images in this directory (e.g., `images/members/`)
2. Recommended image size: 400x400 pixels or larger
3. Recommended format: JPG or PNG
4. Images will be automatically cropped to focus on the face area (center top)

## Naming Convention

Use lowercase with hyphens for spaces:
- `zhou-jianguo.jpg`
- `wang-shixiang.jpg`
- `firstname-lastname.jpg`

## Updating Member Data

In `data/members.yml`, update the member entry:

```yaml
- name: "周建国 (Jian-Guo Zhou)"
  role: "负责人"
  institution: "Zhou Lab"
  description: "主要负责计算平台、资金、文稿和监管"
  avatar: "images/members/zhou-jianguo.jpg"
  avatar_type: "image"
  links:
    google_scholar: "#"
    researchgate: "#"
    orcid: "#"
    github: "#"
```

## Avatar Types

- `avatar_type: "image"` - Use a custom image from the images/members directory
- `avatar_type: "icon"` - Use a FontAwesome icon (default if not specified)

## Image Styling

Images are automatically styled to:
- Display as circular avatars
- Focus on the center-top area (face region)
- Scale up on hover
- Fallback to default icon if image fails to load
