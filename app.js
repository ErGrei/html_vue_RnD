// Начальные данные для устройств и узлов
const devices = [
    {
      id: 1,
      name: 'Устройство 1',
      isEditing: false,
      nodes: [
        { id: 1, name: 'Узел 1', isEditing: false },
        { id: 2, name: 'Узел 2', isEditing: false },
        { id: 3, name: 'Узел 3', isEditing: false }
      ]
    },
    {
      id: 2,
      name: 'Устройство 2',
      isEditing: false,
      nodes: [
        { id: 4, name: 'Узел 1', isEditing: false },
        { id: 5, name: 'Узел 2', isEditing: false },
        { id: 6, name: 'Узел 3', isEditing: false }
      ]
    },
    {
      id: 3,
      name: 'Устройство 3',
      isEditing: false,
      nodes: [
        { id: 7, name: 'Узел 1', isEditing: false },
        { id: 8, name: 'Узел 2', isEditing: false },
        { id: 9, name: 'Узел 3', isEditing: false }
      ]
    }
  ];
  
  let newDeviceId = 4;
  let newNodeId = 10;
  
