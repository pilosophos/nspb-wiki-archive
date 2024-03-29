module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.md',
    './*.html',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch',
            td: {
              border: "1px solid gray",
              padding: ".5em",
            },
            tr: {
              border: "1px solid gray",
            },
            th: {
              border: "1px solid gray",
              "background-color": "lightgray",
              padding: ".5em",
            },
            a: {
              "text-decoration": "none",
              "color": "#3366cc",
            },
            "a:visited": {
              "color": "#795cb2",
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
