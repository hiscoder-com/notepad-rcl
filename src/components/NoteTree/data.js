export const initialData = [
  {
    id: '1_n',
    title: 'note1',
    isFolder: false,
    parent_id: null,
    sorting: 0,
  },
  {
    id: '2_n',
    title: 'note2',
    isFolder: false,
    parent_id: null,
    sorting: 1,
  },
  {
    id: '3_n',
    title: 'note3',
    isFolder: false,
    parent_id: null,
    sorting: 2,
  },
  {
    id: '4_n',
    title: 'note4',
    isFolder: false,
    parent_id: null,
    sorting: 3,
  },
  {
    id: '5_n',
    title: 'note5',
    isFolder: false,
    parent_id: null,
    sorting: 4,
  },
  {
    id: '1_fol',
    title: 'folder1',
    isFolder: true,
    parent_id: null,
    sorting: 5,
  },
];

export const style = {
  searchContainer: {
    position: 'relative',
    marginBottom: '10px',
    maxWidth: '320px',
  },
  nodeStyle: {
    cursor: 'pointer',
    borderRadius: '5px',
    userSelect: 'none',
    selectedColor: '#FFB703',
    hoveredColor: '#FFF5DD',
    backgroundColor: 'transparent',
  },
  searchInput: {
    border: '0',
    borderBottom: '1px solid #555',
    background: 'transparent',
    width: '100%',
    padding: '24px 0 5px 0',
    fontSize: '14px',
    outline: 'none',
  },
  searchLabel: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    fontSize: '14px',
    color: '#555',
    transition: 'all 0.5s ease-in-out',
  },
  contextMenuContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    zIndex: '100',
    whiteSpace: 'nowrap',
  },
  contextMenuItem: {
    padding: '4px 30px 4px 10px',
    cursor: 'pointer',
    hoveredColor: '#EDEDED',
    backgroundColor: 'transparent',
  },
  contextMenuWrapperStyle: { position: 'fixed', zIndex: 50 },
};

export const initialData_2 = [
  {
    id: 'first_folder_key_from_DB',
    title: 'folder1',
    created_at: new Date('2022-10-15 07:59:58.3642'),
    isFolder: true,
    parent_id: null,
    sorting: 0,
  },
  {
    id: 'sixth_note_key_from_DB',
    title: 'note6',
    data: {
      time: 1550476186479,
      blocks: [
        {
          id: 'zbGZFPM-iI',
          type: 'paragraph',
          data: {
            text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
          },
        },
      ],
      version: '2.27.2',
    },
    created_at: new Date('2022-10-15 07:59:58.3642'),
    isFolder: false,
    parent_id: null,
    sorting: 1,
  },
  {
    id: 'first_note_key_from_DB',
    title: 'note1',
    data: {
      time: 1550476186479,
      blocks: [
        {
          id: 'zbGZFPM-iI',
          type: 'paragraph',
          data: {
            text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
          },
        },
      ],
      version: '2.27.2',
    },
    created_at: new Date('2022-10-15 07:59:58.3642'),
    isFolder: false,
    parent_id: null,
    sorting: 2,
  },
  {
    id: 'second_note_key_from_DB',
    title: 'note2',
    data: {
      time: 1550476186479,
      blocks: [
        {
          id: 'zbGZFPM-iI',
          type: 'paragraph',
          data: {
            text: 'Designed to be extendable and pluggable with a simple API',
          },
        },
      ],
      version: '2.27.2',
    },
    created_at: new Date('2022-10-15 07:59:58.3642'),
    isFolder: false,
    parent_id: 'first_folder_key_from_DB',
    sorting: 0,
  },
  {
    id: 'third_note_key_from_DB',
    title: 'note3',
    data: {
      time: 1550476186479,
      blocks: [
        {
          id: 'zbGZFPM-iI',
          type: 'paragraph',
          data: {
            text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
          },
        },
      ],
      version: '2.27.2',
    },
    created_at: new Date('2022-10-15 07:59:58.3642'),
    isFolder: false,
    parent_id: 'first_folder_key_from_DB',
    sorting: 1,
  },
  {
    id: 'fourth_note_key_from_DB',
    title: 'note4',
    data: {
      time: 1550476186479,
      blocks: [
        {
          id: 'zbGZFPM-iI',
          type: 'paragraph',
          data: {
            text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
          },
        },
      ],
      version: '2.27.2',
    },
    created_at: new Date('2022-10-15 07:59:58.3642'),
    isFolder: false,
    parent_id: 'first_folder_key_from_DB',
    sorting: 2,
  },
  {
    id: 'fifth_note_key_from_DB',
    title: 'note5',
    data: {
      time: 1550476186479,
      blocks: [
        {
          id: 'zbGZFPM-iI',
          type: 'paragraph',
          data: {
            text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
          },
        },
      ],
      version: '2.27.2',
    },
    created_at: new Date('2022-10-15 07:59:58.3642'),
    isFolder: false,
    parent_id: 'first_folder_key_from_DB',
    sorting: 3,
  },
];
