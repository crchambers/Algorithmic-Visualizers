var rbt;

var redelems;
var blackelems;

var rootposition;

function start() {
    rbt = new RBT();
}

function clearBoard(){
    let elem = document.getElementById('rbtzone')
    while(elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

function addNode() {
    clearBoard();
    rbt.insert(document.getElementById('nodevalue').value);    
    printLevelOrder();
}

 
/* function to print level order traversal of tree*/
function printLevelOrder()
{
    var h = height(rbt.root);
    var i;
    for (i=1; i<=h; i++)
        //Extract root position
        if(i == 1) {
            rootposition = printCurrentLevel(rbt.root, i, i);
        }
        else{
            printCurrentLevel(rbt.root, i, i);    
        }
        
}
 
/* Compute the "height" of a tree -- the number of
nodes along the longest path from the root node
down to the farthest leaf node.*/
function height(root)
{
    if (root == null)
        return 0;
    else
    {
        /* compute  height of each subtree */
        var lheight = height(root.left);
        var rheight = height(root.right);
            
        /* use the larger one */
        if (lheight > rheight)
            return(lheight+1);
        else return(rheight+1);
    }
}

/* Print nodes at the current level */
function printCurrentLevel (root ,traverseLevel, currentLevel)
{
    if (root == null){
        return null;
    }
    if (traverseLevel == 1){
        var nodes = document.createElement('div');
        if(root.isBlack){
            nodes.setAttribute('class', 'blackNode');
        }
        else{
            nodes.setAttribute('class', 'redNode');
        }
        nodes.innerHTML = root.value;
        document.getElementById('rbtzone').appendChild(nodes);
        return getPositionXY(nodes)
    }
    else if (level > 1)
    {
        printCurrentLevel(root.left, traverseLevel-1);
        printCurrentLevel(root.right, traverseLevel-1);
    }
}   

// Retrieve the x and y position of the particular element
function getPositionXY(element) {
    var rect = element.getBoundingClientRect();
    return [rect.x, rect.y]
    
}