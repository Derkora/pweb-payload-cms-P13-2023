import payload from 'payload';
/** @type {import('payload/types').CollectionConfig} */
const Todo = {
  slug: "Todo",
  admin: {
    useAsTitle: "Tugas"
  },
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },
  hooks: {
    afterOperation: [
      async (args) => {
        if (args.operation == "create") {
          payload.create({
            collection: "log",
            data: {
              namalog: "Todo",
              action: "create",
              timestamp: new Date(),
            },
          });
        } 
        if (args.operation == "update") {
          payload.create({
            collection: "log",
            data: {
              namalog: "Todo",
              action: "update",
              timestamp: new Date(),
            },
          });
        } 
        if (args.operation == "delete") {
          payload.create({
            collection: "log",
            data: {
              namalog: "Todo",
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
      name: 'tombol',
      type: 'checkbox',
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
  
}

export default Todo;
