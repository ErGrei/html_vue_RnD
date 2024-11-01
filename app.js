// Начальные данные для устройств и узлов
const devices = [
  {
    id: 1,
    name: "Устройство 1",
    isEditing: false,
    nodes: [
      { id: 1, name: "Узел 1", isEditing: false },
      { id: 2, name: "Узел 2", isEditing: false },
      { id: 3, name: "Узел 3", isEditing: false },
    ],
  },
  {
    id: 2,
    name: "Устройство 2",
    isEditing: false,
    nodes: [
      { id: 4, name: "Узел 1", isEditing: false },
      { id: 5, name: "Узел 2", isEditing: false },
      { id: 6, name: "Узел 3", isEditing: false },
    ],
  },
  {
    id: 3,
    name: "Устройство 3",
    isEditing: false,
    nodes: [
      { id: 7, name: "Узел 1", isEditing: false },
      { id: 8, name: "Узел 2", isEditing: false },
      { id: 9, name: "Узел 3", isEditing: false },
    ],
  },
];

let newDeviceId = Date.now();
let newNodeId = Date.now();;

document.addEventListener('DOMContentLoaded', renderApp);

function renderApp() {
  const divaseList = document.getElementById("deviceList");
  divaseList.innerHTML = "";
  devices.forEach((device) =>
    divaseList.appendChild(createDivaseElement(device))
  );
}

function createDivaseElement(device) {
  const deviceDiv = document.createElement("div");
  deviceDiv.className = "device-item";

  const devaseHeader = createDevaseHeader(device);
  deviceDiv.appendChild(devaseHeader);

  const createNode = createAddNodeElement(device.id);
  deviceDiv.appendChild(createNode);

  const nodeListDiv = createNodeList(device);
  deviceDiv.appendChild(nodeListDiv);

  return deviceDiv;
}

function createDevaseHeader(device) {
  const devaseHeader = document.createElement("div");
  devaseHeader.className = "device-header";

  if (device.isEditing) {
    const editInput = document.createElement("input");
    editInput.value = device.name;

    editInput.oninput = (e) => {
      device.name = e.target.value;
    };
    devaseHeader.appendChild(editInput);

    const saveButton = document.createElement("button");
    saveButton.innerText = "Сохранить";
    devaseHeader.appendChild(saveButton);
    saveButton.onclick = () => {
      device.isEditing = false;
      renderApp();
    };
  } else {
    const deviceName = document.createElement("span");
    deviceName.innerText = device.name;
    devaseHeader.appendChild(deviceName);

    const editButton = document.createElement("button");
    editButton.innerText = "Редактировать";
    devaseHeader.appendChild(editButton);

    editButton.onclick = () => {
      device.isEditing = true;
      renderApp();
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Удалить";
    devaseHeader.appendChild(deleteButton);

    deleteButton.onclick = () => {
      const index = devices.findIndex((e) => e.id === device.id);
      if (index !== -1) {
        devices.splice(index, 1);
      }
      renderApp();
    };
  }
  return devaseHeader;
}

function createAddNodeElement(deviceid) {
  const nodeDiv = document.createElement("div");
  nodeDiv.className = "add-node";

  nodeDiv.innerHTML = ` <input type='text' placeholder = 'Название узла' id = 'newNodeInput-${deviceid}'>
<button onclick = 'addNode(${deviceid})'>Добавить узел</button>
`;
  return nodeDiv;
}
//RnD
function addNode(deviceId) {
  const input = document.getElementById(`newNodeInput-${deviceId}`);
  // console.log(input)
  const name = input.value.trim();
  if (name) {
    const device = devices.find((d) => d.id === deviceId);
    device.nodes.push({ id:  Date.now(), name, isEditing: false });
    input.value = "";
    renderApp();
    // console.log( device.nodes)
  }
}

function createNodeList(device) {
  const nodeListDiv = document.createElement("div");
  nodeListDiv.className = "node-list";

  device.nodes.forEach((node, index) => {
    const nodeDiv = createNodeElement(
      device.id,
      node,
      index,
      device.nodes.length
    );
    nodeListDiv.appendChild(nodeDiv);
  });

  return nodeListDiv;
}

function createNodeElement(deviceId, node, index, nodesLength) {
  const nodeDiv = document.createElement("div");
  nodeDiv.className = "node-item";

  if (node.isEditing) {
    const nodeEditInput = document.createElement("input");
    nodeEditInput.value = node.name;
    nodeEditInput.oninput = (e) => (node.name = e.target.value);
    nodeDiv.appendChild(nodeEditInput);

    const saveNodeButton = document.createElement("button");
    saveNodeButton.innerText = "Сохранить";
    saveNodeButton.onclick = () => {
      node.isEditing = false;
      renderApp();
    };
    nodeDiv.appendChild(saveNodeButton);
  } else {
    const nodeName = document.createElement("span");
    nodeName.innerText = node.name;
    nodeDiv.appendChild(nodeName);

    const editNodeButton = document.createElement("button");
    editNodeButton.innerText = "Редактировать";
    editNodeButton.onclick = () => {
      node.isEditing = true;
      renderApp();
    };
    nodeDiv.appendChild(editNodeButton);
  }

  const deleteNodeButton = document.createElement("button");
  deleteNodeButton.innerText = "Удалить";
  deleteNodeButton.onclick = () => deleteNode(deviceId, node.id);
  nodeDiv.appendChild(deleteNodeButton);

  const moveUpButton = document.createElement("button");
  moveUpButton.innerText = "Вверх";
  moveUpButton.onclick = () => moveNode(deviceId, index, -1);
  moveUpButton.disabled = index === 0;
  nodeDiv.appendChild(moveUpButton);

  const moveDownButton = document.createElement("button");
  moveDownButton.innerText = "Вниз";
  moveDownButton.onclick = () => moveNode(deviceId, index, 1);
  moveDownButton.disabled = index === nodesLength - 1;
  nodeDiv.appendChild(moveDownButton);

  return nodeDiv;
}

function deleteNode(deviceId, nodeId) {
  const device = devices.find((d) => d.id === deviceId);
  const index = device.nodes.findIndex((n) => n.id === nodeId);
  if (index !== -1) {
    device.nodes.splice(index, 1);
    renderApp();
  }
}

function moveNode(deviceId, index, direction) {
  const device = devices.find((d) => d.id === deviceId);
  const newIndex = index + direction;
  [device.nodes[index], device.nodes[newIndex]] = [
    device.nodes[newIndex],
    device.nodes[index],
  ];
  renderApp();
}

function addDevice() {
  const input = document.getElementById("newDeviceInput");
  const name = input.value.trim();
  if (name) {
    devices.push({ id: newDeviceId++, name, isEditing: false, nodes: [] });
    input.value = "";
    renderApp();
  }
}

function deleteDevice(deviceId) {
  const index = devices.findIndex((d) => d.id === deviceId);
  if (index !== -1) {
    devices.splice(index, 1);
    renderApp();
  }
}

// renderApp();
