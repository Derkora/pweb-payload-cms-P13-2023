/** @type {import('payload/types').CollectionConfig} */
const Log = {
  slug: "Log",
  admin: {
    useAsTitle: "Collection",
  },
  access: {
    read: () => true,
    create: () => true, // Menyembunyikan opsi pembuatan log dari admin
  },
  fields: [
    {
      name: 'Collection',
      type: 'text',
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
  hooks : {
    afterChange : [
      async ({ operation, data, originalDoc }) => {
        if (operation === 'create' || operation === 'update' || operation === 'delete') {
          const collection = originalDoc.slug;
          const action = operation;
          const timestamp = new Date().toISOString();
          await payload.create({
            collection : Log.slug,
            data : { Collection : collection, Action : action, Timestamp : timestamp }
          });
        }
      }
    ]
  }
};

export default Log;
