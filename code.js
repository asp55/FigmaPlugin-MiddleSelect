const command = figma.command;
function getInstance(item) {
    console.log("getInstance", item);
    if (item.parent.type === "INSTANCE") {
        return item.parent;
    }
    else if (item.parent.type) {
        return getInstance(item.parent);
    }
    else
        return null;
}
function getOuterInstance(item) {
    let outerInstance = null;
    if (item.type === "INSTANCE") {
        outerInstance = item;
    }
    let checkItem = item;
    while (checkItem.parent) {
        if (checkItem.parent.type === "INSTANCE") {
            outerInstance = checkItem.parent;
        }
        checkItem = checkItem.parent;
    }
    return outerInstance;
}
let instances = [];
if (command === "containing") {
    instances = figma.currentPage.selection.map(selectedItem => getInstance(selectedItem)).filter(val => val !== null);
}
else if (command === "top") {
    instances = figma.currentPage.selection.map(selectedItem => getOuterInstance(selectedItem)).filter(val => val !== null);
}
figma.currentPage.selection = instances;
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
