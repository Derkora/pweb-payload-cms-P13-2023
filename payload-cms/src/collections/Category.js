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
  hooks: {
    afterChange: [
      async ({ data, req }) => {
        // logic to execute after a change in Category
        await req.payload.create({
          collection: 'Log',
          data: {
            Collection: 'Category',
            Action: 'create',
            Timestamp: new Date(),
          },
        });
      },
      async ({ id, data, req }) => {
        // logic to execute after an update in Category
        await req.payload.update({
          collection: 'Log',
          data: {
            Collection: 'Category',
            Action: 'update',
            Timestamp: new Date(),
          },
        });
      },
      async ({ id, req }) => {
        // logic to execute after a delete in Category
        await req.payload.delete({
          collection: 'Log',
          data: {
            Collection: 'Category',
            Action: 'delete',
            Timestamp: new Date(),
          },
        });
      }
    ],
  }
}

export default Category;