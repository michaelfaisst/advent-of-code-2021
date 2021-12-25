export interface INode {
    value?: number;
    left?: INode;
    right?: INode;
    parent?: INode;
}

let position = -1;

export const parseTree = (line: string): INode => {
    position = -1;
    return parseTreeInternal(line, undefined);
};

const parseTreeInternal = (line: string, parent?: INode): INode => {
    const node: INode = {
        parent
    };

    while (true) {
        position++;
        switch (line[position]) {
            case "[":
                node.left = parseTreeInternal(line, node);
                break;
            case ",":
                node.right = parseTreeInternal(line, node);
                break;
            case "]":
                return node;
            default:
                node.value = +line[position];
                return node;
        }
    }
};

export const add = (tree1: INode, tree2: INode) => {
    const newRoot = { left: tree1, right: tree2 } as INode;

    newRoot.left!.parent = newRoot;
    newRoot.right!.parent = newRoot;

    return newRoot;
};

export const reduce = (root: INode) => {
    while (true) {
        const exploded = explode(root);
        if (exploded) continue;

        const splitted = split(root);

        if (!exploded && !splitted) return;
    }
};

export const explode = (
    node: INode,
    depth: number = 0
): boolean | undefined => {
    if (node.left) {
        const success = explode(node.left, depth + 1);
        if (success) return success;
    }

    if (
        depth >= 4 &&
        node.left &&
        node.left.value !== undefined &&
        node.right &&
        node.right.value !== undefined
    ) {
        addToPredecessor(node, node.left.value);
        addToSuccessor(node, node.right.value);
        node.left = undefined;
        node.right = undefined;
        node.value = 0;
        return true;
    }

    if (node.right) {
        const success = explode(node.right, depth + 1);
        if (success) return success;
    }
};

const addToPredecessor = (node: INode, value: number) => {
    let current: INode | undefined = node;

    while (current) {
        if (current.parent && current.parent.left !== current) {
            current = current.parent.left;
            break;
        }

        current = current.parent;
    }

    if (!current) {
        return;
    }

    while (current.right) {
        current = current.right;
    }

    if (current.value !== undefined) {
        current.value += value;
    }
};

const addToSuccessor = (node: INode, value: number) => {
    let current: INode | undefined = node;

    while (current) {
        if (current.parent && current.parent.right !== current) {
            current = current.parent.right;
            break;
        }

        current = current.parent;
    }

    if (!current) {
        return;
    }

    while (current.left) {
        current = current.left;
    }

    if (current.value !== undefined) {
        current.value += value;
    }
};

export const split = (node: INode): boolean | undefined => {
    if (node.left) {
        const success = split(node.left);
        if (success) return success;
    }

    if (node.value && node.value >= 10) {
        node.left = {
            value: Math.floor(node.value / 2),
            parent: node
        } as INode;
        node.right = {
            value: Math.ceil(node.value / 2),
            parent: node
        } as INode;
        node.value = undefined;

        return true;
    }

    if (node.right) {
        const success = split(node.right);
        if (success) return success;
    }
};

export const getMagnitude = (node: INode): number => {
    if (node.value) {
        return node.value;
    }

    let leftValue = 0;
    let rightValue = 0;

    if (node.left) {
        leftValue = 3 * getMagnitude(node.left);
    }

    if (node.right) {
        rightValue = 2 * getMagnitude(node.right);
    }

    return leftValue + rightValue;
};

export const getTreeString = (node: INode) => {
    let buffer = "";
    return getTreeStringInternal(node, buffer);
};

const getTreeStringInternal = (node: INode, buffer: string) => {
    if (node.left) {
        buffer = getTreeStringInternal(node.left, buffer + "[");
    }

    buffer += node.value !== undefined ? node.value : ",";

    if (node.right) {
        buffer = getTreeStringInternal(node.right, buffer);
        buffer += "]";
    }

    return buffer;
};
