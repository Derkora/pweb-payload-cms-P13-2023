/** @type {import('payload/types').CollectionConfig} */
const Todo = {
    slug: "Todo",
    access: {
      read: () => true,
      update: () => true,
      delete: () => true,
      create: () => true,
    },
    fields: [
      {
        name: "Nama Tugas",
        type: "text",
        required: true,
      },
      {
        name: 'Tanggal',
        type: 'date',
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
        filterOptions: ({ relationTo, siblingData }) => {
          return {
            division : { equals : 'Kuliah' }
          }
        }
      },
    ]
  }
  
  export default Todo;
  