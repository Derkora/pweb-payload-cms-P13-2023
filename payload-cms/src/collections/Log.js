/** @type {import('payload/types').CollectionConfig} */
const Log = {
  slug: "Log",
  admin: {
    useAsTitle: "Collection",
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "Collection",
      type: "text",
      required: true,
    },
    {
      name: "Action",
      type: "select",
      required: true,
      options: [
        { label: "Create", value: "create" },
        { label: "Update", value: "update" },
        { label: "Delete", value: "delete" },
      ],
    },
    {
      name: 'Timestamp',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd MMM yyy h:mm:ss a',
        },
        readOnly: true,
      },
      defaultValue: new Date().toISOString(),
    }
  ],
}

export default Log;
