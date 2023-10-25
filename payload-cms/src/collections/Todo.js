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
  ],
  hooks: {
    afterChange: [
      async ({ data, req }) => {
        // logic to execute after a change in Todo
        await req.payload.create({
          collection: 'Log',
          data: {
            Collection: 'Todo',
            Action: 'create',
            Timestamp: new Date(),
          },
        });
      },
      async ({ id, data, req }) => {
        // logic to execute after an update in Todo
        await req.payload.update({
          collection: 'Log',
          data: {
            Collection: 'Todo',
            Action: 'update',
            Timestamp: new Date(),
          },
        });
      },
      async ({ id, req }) => {
        // logic to execute after a delete in Todo
        await req.payload.delete({
          collection: 'Log',
          data: {
            Collection: 'Todo',
            Action: 'delete',
            Timestamp: new Date(),
          },
        });
      },
    ],
  },
}

export default Todo;
