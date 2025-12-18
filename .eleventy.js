require('dotenv').config();

module.exports = function(eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("_functions");

  // Filters
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  // Collections
  eleventyConfig.addCollection("themes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/themes/*.md");
  });

  eleventyConfig.addCollection("cmsPages", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/cms/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
