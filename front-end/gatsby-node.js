exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      essays: allSanityEssay {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  console.log(data.essays.nodes);
  const essays = data.essays.nodes;
  essays.forEach((essay, index) => {
    console.log("In node", essay.slug.current);
    const path = `/essay/${essay.slug.current}`;

    createPage({
      path,
      component: require.resolve("./src/templates/essay.js"),
      context: { slug: essay.slug.current },
    });
  });
};
