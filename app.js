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
  
function renderApp (){
    const divaseList = document.getElementById('deviceList');
    divaseList.innerHTML = '';
    devices.forEach(device => divaseList.appendChild(createDivaseElement(device)))
};

function createDivaseElement (device){
    const deviceDiv = document.createElement('div');
    deviceDiv.className = 'device-item';

    const devaseHeader = createDevaseHeader(device);
    deviceDiv.appendChild(devaseHeader);

    const createNode = createNodeElement(device);
    deviceDiv.appendChild(createNode);

    return deviceDiv
}

function createDevaseHeader (device){
    const devaseHeader = document.createElement('div');
    devaseHeader.className = 'device-header';

    if (device.isEditing) {
        const editInput = document.createElement('input');
        editInput.value = device.name;

        editInput.oninput = (e) => {device.name = e.target.value};
        devaseHeader.appendChild(editInput)

        const saveButton = document.createElement('button');
        saveButton.innerText = 'Сохранить';
        devaseHeader.appendChild(saveButton);
        saveButton.onclick = () => {
            device.isEditing = false;
            renderApp();
        } 
    } else {
        const deviceName = document.createElement('span');
        deviceName.innerText = device.name;
        devaseHeader.appendChild(deviceName)

        const editButton = document.createElement('button');
        editButton.innerText = 'Редактировать';
        devaseHeader.appendChild(editButton);

        editButton.onclick = () => {
            device.isEditing = true;
            renderApp();
        } 

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Удалить';
        devaseHeader.appendChild(deleteButton);

        deleteButton.onclick = () => {
            const index = devices.findIndex(e => e.id === device.id );
            if (index !== -1) {
                devices.splice(index, 1);
            }
            renderApp();
        } 
    }
    return devaseHeader

}

function createNodeElement() {
const nodeDiv = document.createElement('div');
nodeDiv.className = 'add-node';

nodeDiv.innerHTML = ` <input type='text' placeholder = 'Название узла'>
<button onclick = 'addNode()'>Добавить узел</button>
`


return nodeDiv
}

function addNode(){
console.log('работает')
}
renderApp ()