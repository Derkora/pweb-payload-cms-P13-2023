/** @type {import('payload/types').CollectionConfig} */

const Category = {
  slug: "Category",
  admin: {
    useAsTitle: "nama"
  },
  fields: [
    {
      name: "nama",
      type: "text",
      required: true,
    },
  ],
  
}

export default Category;