const command = figma.command;
function getContaining(item, targetType) {
    if (item.parent) {
        if (item.parent.type === targetType) {
            return item.parent;
        }
        else {
            return getContaining(item.parent, targetType);
        }
    }
    else
        return null;
}
function getTop(item, targetType) {
    console.log("Get Top", item, targetType);
    let outerNode = null;
    if (item.type === targetType) {
        outerNode = item;
    }
    let checkItem = item;
    while (checkItem.parent) {
        if (checkItem.parent.type === targetType) {
            outerNode = checkItem.parent;
        }
        checkItem = checkItem.parent;
    }
    return outerNode;
}
let commandArgs = {
    "containingInstance": { callback: getContaining, type: "INSTANCE" },
    "topInstance": { callback: getTop, type: "INSTANCE" },
    "containingFrame": { callback: getContaining, type: "FRAME" },
    "topFrame": { callback: getTop, type: "FRAME" },
    "containingGroup": { callback: getContaining, type: "GROUP" },
    "topGroup": { callback: getTop, type: "GROUP" }
}[command];
let selection = figma.currentPage.selection.map(selectedItem => commandArgs.callback(selectedItem, commandArgs.type)).filter(val => val !== null);
if (selection.length > 0)
    figma.currentPage.selection = selection;
else {
    console.log(`No ${commandArgs.type.toLowerCase()}s above selection`);
    figma.notify(`Selection is not the child of any ${commandArgs.type.toLowerCase()}s.`);
}
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
