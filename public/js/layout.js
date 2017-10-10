let state1 = {
    width: 400, 
    height: 400,
    url: 'child.html',
    title: 'Window 1',
    frame: false 
};
let state2 = {
    width: 400, 
    height: 400,
    url: 'child.html',
    title: 'Window 2',
    frame: false 
};
let state3 = {
    width: 400, 
    height: 400,
    url: 'child.html',
    title: 'Window 3',
    frame: false 
};
let state4 = {
    width: 400, 
    height: 400,
    url: 'child.html',
    title: 'Window 4',
    frame: false 
};
let state5 = {
    width: 400, 
    height: 400,
    url: 'child.html',
    title: 'Window 5',
    frame: false 
};

let configs = [state1, state2, state3, state4, state5];

let layout = new windowmanager.Layout('tabbed', 'layout-example', configs); 

function addWindow() {
    debugger
    layout.addWindow({
        width: 400, 
        height: 400,
        url: 'child.html',
        title: 'Window 6',
        frame: false 
    });
}