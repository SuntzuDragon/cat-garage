const lokiBtn = document.getElementById('lokiBtn');
const mugatuBtn = document.getElementById('mugatuBtn');

const database = firebase.database();
const rootRef = database.ref('/cats');

addBtnListener('loki', lokiBtn);
addBtnListener('mugatu', mugatuBtn);

rootRef.on('value', (snapshot) => {
    update();
});

function update() {
    setStatus('loki', lokiBtn);
    setStatus('mugatu', mugatuBtn);

    setDate('loki', lokiDate);
    setDate('mugatu', mugatuDate);
}

function addBtnListener(name, button) {
    button.addEventListener('click', (e) => {
        rootRef.child(name).set({
            dateModified: new Date().toLocaleString(),
            inGarage: button.checked
        });
    });
}

function setStatus(name, button) {
    rootRef.child(name).child('inGarage').get().then((snapshot) => {
        if (snapshot.exists()) {
            button.checked = snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function setDate(name, spanId) {
    rootRef.child(name).child('dateModified').get().then((snapshot) => {
        if (snapshot.exists()) {
            spanId.textContent = snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}