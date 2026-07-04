# Personal Academic Portfolio Template

This repository contains a minimal, single‑page portfolio website inspired by the design and structure of Luke Qiao’s portfolio.  The goal is to provide a clean starting point for an academic/engineering profile that you can host with GitHub Pages.  The code is intentionally simple—just HTML, CSS and a small amount of JavaScript—so you can easily tweak the layout, colours, and content without learning a heavy framework.

## Features

- **Sticky navigation bar** with links that scroll smoothly to sections on the page.
- **Hero section** with your name, a short subtitle, and call‑to‑action buttons linking to your CV, GitHub, LinkedIn and email.
- **About section** with space for a headshot and a short biography.
- **Research, Experience, Projects and Education sections** laid out as card grids with bullet points and tags to highlight technologies and topics.
- **Contact section** with quick links for email and social profiles.
- **Responsive design:** the layout rearranges gracefully on smaller screens, and a hamburger menu appears for mobile navigation.

## Customising the Template

1. **Clone this repository and rename it to `<username>.github.io`** where `<username>` is your GitHub username.  GitHub Pages will automatically publish the contents of the main branch at `https://<username>.github.io`.
2. Replace the placeholder text and links in `index.html` with your own information.  Look for comments and placeholder values like `yourusername` or `your.email@domain.com`.
3. Swap out the placeholder headshot at `assets/headshot.jpg` with your own photo.  Make sure to keep the same filename or update the `<img>` tag in the About section accordingly.
4. Replace `resume.pdf` with your actual CV.  Visitors will be able to download it via the CV button in the hero section.
5. Adjust colours, fonts or spacing in `styles.css` to suit your personal taste.  Variables defined at the top of the file make it easy to change the overall colour palette.
6. Modify or add cards in the Research, Experience and Projects sections to reflect your own work.  Each card is structured with a heading, optional subtitle, descriptive paragraphs, bullet points and a list of tags.
7. If you want to add more sections or pages, extend the markup in `index.html` and create additional files as needed.  Because this is a static site, there is no build process—just edit and refresh.

## Deploying to GitHub Pages

1. Push your modified repository to GitHub.  Make sure the repository name matches `<username>.github.io` exactly.
2. GitHub will automatically build and publish your site.  It may take a couple of minutes for the first deploy to appear.
3. You can attach a custom domain by adding a `CNAME` file with your domain or by configuring the custom domain in the repository settings on GitHub.

## License

This template is provided under the MIT License.  You are free to use, modify and distribute it.  No attribution is required, but a link back to the original repository is always appreciated.