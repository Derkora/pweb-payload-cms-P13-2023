import payload from 'payload';
/** @type {import('payload/types').CollectionConfig} */

const Category = {
  slug: "Category",
  admin: {
    useAsTitle: "nama"
  },
  hooks: {
    afterOperation: [
      async (args) => {
        if (args.operation == "create") {
          payload.create({
            collection: "log",
            data: {
              namalog: "Category",
              action: "create",
              timestamp: new Date(),
            },
          });
        } 
        if (args.operation == "update") {
          payload.create({
            collection: "log",
            data: {
              namalog: "Category",
              action: "update",
              timestamp: new Date(),
            },
          });
        } 
        if (args.operation == "delete") {
          payload.create({
            collection: "log",
            data: {
              namalog: "Category",
              action: "delete",
              timestamp: new Date(),
            },
          });
        }
      },
    ],
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
