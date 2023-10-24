/** @type {import('payload/types').CollectionConfig} */
const Category = {
  slug : "Category",
  admin : {
  useAsTitle : "nama"
  },
  fields : [
      {
        name: "nama",
        type: "text",
        required: true,
      },
  ],
  hooks : {
    afterChange : [
      async ({ operation, data, originalDoc }) => {
        if (operation === 'create' || operation === 'update' || operation === 'delete') {
          const collection = Category.slug;
          const action = operation;
          const timestamp = new Date().toISOString();
          await payload.create({
            collection : 'Log',
            data : { Collection : collection, Action : action, Timestamp : timestamp }
          });
        }
      }
    ],
    beforeValidate : [
      async ({ data }) => {
        if (data._id) {
          const category = await payload.findOne({
            collection : Category.slug,
            id : data._id
          });
          data.Collection = category.nama;
        } else {
          data.Collection = Category.slug;
        }
        return data;
      }
    ]
  }
}
export default Category;