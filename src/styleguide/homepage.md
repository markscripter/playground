# Overview
The following is a reference for the styleguide. It goes over the overall CSS architecture and the definition of each section within it. Much of this was inspired from [Gemma](https://github.com/colepeters/gemma) & [ITCSS](https://github.com/itcss/itcss-netmag).

## CSS Groups

### Global
Global tasks such as normalization, css reset and clearfix stuff.

### Animations
Selection of CSS animations using keystrokes. They can be used as class names or as actual animation names.

### Settings
CSS custom properties, media queries, and other pieces of code which do not directly output CSS classes themselves.

### Elements
These are highly generic styles that should rarely, if ever, be altered, due to the breadth of their implementation. No classes are defined within these styles

### Objects
Context-agnostic classes that serve to define high-level structure and layout; this includes grid structures and the media object. Object classes use the o- namespace.

### Components
Context-specific classes that generate distinct components of an interface (for example, buttons). Components use the c- namespace.

### Utilities
Structure- and layout-related classes that do one thing extremely well. These styles are highly granular, and can be combined with surface classes (see below) to construct ‘generic’ UI objects.

### Visual
Similar to utilities, but focused on surface- (or ‘skin’)-level styles as opposed to structural/layout styles, like colors or font settings. Surface classes use the s- namespace.

## Theming
Create a theme file within the '/styles/_themes/' directory.
