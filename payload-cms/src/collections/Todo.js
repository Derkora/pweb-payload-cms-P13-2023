/** @type {import('payload/types').CollectionConfig} */
const Todo = {
  slug: "Todo",
  admin : {
    useAsTitle : "Tugas"
  },
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'tombol',
      type: 'checkbox', 
      label: 'done',
      defaultValue: false,
    },
    {
      name: "Tugas",
      type: "text",
      required: true,
    },
    {
      name: 'Tanggal',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'Category',
      type: 'relationship',
      required: true,
      relationTo: 'Category',
    },
  ],
  hooks : {
    afterChange : [
      async ({ operation, data, originalDoc }) => {
        if (operation === 'create' || operation === 'update' || operation === 'delete') {
          const collection = Todo.slug;
          const action = operation;
          const timestamp = new Date().toISOString();
          await payload.create({
            collection : Log.slug,
            data : { Collection : collection, Action : action, Timestamp : timestamp }
          });
        }
      }
    ],
    beforeValidate : [
      async ({ data }) => {
        if (data._id) {
          const todo = await payload.findOne({
            collection : Todo.slug,
            id : data._id
          });
          data.Collection = todo.Tugas;
        } else {
          data.Collection = Todo.slug;
        }
        return data;
      }
    ]
  }
};

export default Todo;
