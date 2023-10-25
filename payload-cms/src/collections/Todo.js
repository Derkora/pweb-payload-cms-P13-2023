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
    {
      name: 'Category',
      type: 'relationship',
      required: true,
      relationTo: 'Category',
    },
  ],
  
}

export default Todo;
