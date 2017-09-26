let state = {
    width: 400, 
    height: 400,
    url: 'child.html',
    title: 'Window' //+ windowmanager.Window.getAll().length,
    frame: false 
};

let configs = [state, state, state, state, state]

let layout = new windowmanager.Layout('tile', 'layout-example', configs); 

function addWindow() {
    layout.addWindow(state);
}