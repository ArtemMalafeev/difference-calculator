export const makeTree = (ast) => {

    return ast.map((node) => {
        if (node.status === 'added') {
            return `+ ${node.key}: ${node.value}`;
        }

        if (node.status ===  'removed') {
            return `- ${node.key}: ${node.value}`;
        }

        if (node.status === 'changed') {
            return `- ${node.key}: ${node.value[0]}\n+ ${node.key}: ${node.value[1]}`;
        }

        if (node.status === 'unchanged') {
            return `   ${node.key}: ${node.value}`;
        }

        if (node.status === 'object') {
            return makeTree(node.value);
        }
    });
};
