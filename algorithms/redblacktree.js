class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.isBlack = false;
    }
    isLeftChild() {
        return this.parent != null && this.parent.left == this;
    }
    
    isRightChild() {
        return this.parent != null && this.parent.right == this;
    }
}

class RBT {
    constructor() {
        this.root = null;
        this.size = 0;
    }
   
    insert(value) {
        let node = new Node(value);
        
        if(value == null) {
            alert("Make sure the node contains a value");
            return false 
        }
        //Case if the root is empty then inserted node becomes the root node, set node color to black
        if(this.root == null) {
            this.root = node;
            this.size++;
            this.root.isBlack = true;
        }
        //Case when the node needs to traverse past the first level of the RBT
        else {
            
            let returner = this.insertHelper(node, this.root);// Instantiate the recursive helper method.
            
            //In the case that the recursive insert successfully inserted a node, increase the size of the tree.
            if(returner) {
                this.size++
            } 
            else {
                alert("This node and value already exists in the tree, add a different node value");
                this.root.isBlack = true;
            }
            this.root.isBlack = true;
            return returner;
        }

        return true;
    }
    //Recursive helper method of the insert method. Should return true or false depending whether the insertion was successful
    insertHelper(node, parent) {

        //Case when the value to be stored is the exact same as the parent value.
        if(node.value == parent.value) {
            return false;
        }

        //Case when the value that is to be placed is smaller than the parent node value.
        else if(node.value < parent.value) {
            //Case if the left subtree is empty then simply add the node
            if(parent.left == null) {
                parent.left = node;
                node.parent = parent;

                //Enforcing RBT rles to make sure that RBT is within regulation
                if(!node.isBlack && !parent.isBlack) {
                    this.enforceRBT(node);
                }

                return true;
            }
            else {
                return this.insertHelper(node, parent.left);
            }
        }

        //Case when the value that is to be placed is larger than the parent node value.
        else{
            //Case where right subtree is empty, then simply add the new node
            if(parent.right == null) {
                parent.right = node;
                node.parent = parent;
            

            //Enforcing RBT rules to make sure that RBT is within regulation
            if(!node.isBlack && !parent.isBlack) {
                this.enforceRBT(node);
            }

            return true;

            }
            else {
                return this.insertHelper(node, parent.right);
            }   
        }
    }
    //Ensures that that binary tree follows the red black tree rules
    enforceRBT(child) {
        //Only one node in tree. No Conflict.
        if (child == this.root){
            return;
        }
        
        let parent = child.parent;
        let gParent = child.parent.parent;

        // Base Case
		if (child.isBlack || parent.isBlack) {
			return;
		}
        
        // Parent has a black sibling
		if ((gParent.left == null || gParent.right == null)
                || (gParent.left.isBlack || gParent.right.isBlack)) {
             // Left side conflict
            if (gParent.right == null || gParent.right.isBlack) {
                // Black sibling on same side as violating node
                if (parent.right != null && (parent.right == child)) {
                    this.rotate(child, parent);
                    this.enforceRBT(parent);
                    return;
                // Black sibling on opposite side as violating node
                } else {
                    this.rotate(parent, gParent);
                    parent.isBlack = !parent.isBlack;
                    gParent.isBlack = !gParent.isBlack;
                    return;
                }

            }
            // Right side conflict
            else if (gParent.left == null || gParent.left.isBlack) {
                // Black sibling on same side as violating node
                if (parent.left != null && (parent.left == child)) {
                    this.rotate(child, parent);
                    this.enforceRBT(parent);
                    return;
                    // Black sibling on opposite side as violating node
                } else {
                    this.rotate(parent, gParent);
                    parent.isBlack = !parent.isBlack;
                    gParent.isBlack = !gParent.isBlack;
                    return;
                }
            }
        }  

// Grandfathers children are red
else {
    gParent.left.isBlack = !gParent.left.isBlack;
    gParent.right.isBlack = !gParent.right.isBlack;
    gParent.isBlack = !gParent.isBlack;
    this.enforceRBT(gParent);
    return;
}

    }

    rotate(child, parent){
        if (child.isLeftChild()) {
			if (parent.isLeftChild()) {
				parent.parent.left = child;
				child.parent = parent.parent;
				parent.parent = child;
			} else if (parent.isRightChild()) {
				parent.parent.right = child;
				child.parent = parent.parent;
				parent.parent = child;
			}
			parent.left = child.right;
			if (parent.left != null) {
				parent.left.parent = parent;
			}
			child.right = parent;
			if (child.parent == parent) {
				child.parent = null;
				this.root = child;
				parent.parent = child;
			}
		} else if (child.isRightChild()) {
			if (parent.isLeftChild()) {
				parent.parent.left = child;
				child.parent = parent.parent;
				parent.parent = child;
			} else if (parent.isRightChild()) {
				parent.parent.right = child;
				child.parent = parent.parent;
				parent.parent = child;
			}
			parent.right = child.left;
			if (parent.right != null) {
				parent.right.parent = parent;
			}
			child.left = parent;
			if (child.parent == parent) {
				child.parent = null;
				this.root = child;
				parent.parent = child;
			}
		} else {
			throw new IllegalArgumentException(
					"Provided child and parent node referenc3e are not initially (pre-rotation) related that way.");
		}
    }
}
