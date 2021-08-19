import _ from "lodash";

const makeIndent = (depth, symbol = ' ') => {
  return `${'    '.repeat(depth)}  ${symbol} `;
}

const drawNode = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);

    const node = keys.map((key) => {
      return `${makeIndent(depth + 1)}${key}: ${drawNode(value[key], depth + 1)}`;
    }).join('\n');

    return `{\n${node}\n${makeIndent(depth)}}`;
  }

  return value;
}

const drawTree = (ast, depth= 0) => {
    return ast.map((node) => {

      const key = node.key;
      const value = node.value;

        if (node.status === 'added') {
            return `${makeIndent(depth, '+')}${key}: ${drawNode(value, depth)}`;
        }

        if (node.status === 'removed') {
            return `${makeIndent(depth, '-')}${key}: ${drawNode(value, depth)}`;
        }

        if (node.status === 'changed') {
            return `${makeIndent(depth, '-')}${key}: ${drawNode(value[0], depth)}
${makeIndent(depth, '+')}${key}: ${drawNode(value[1], depth)}`;
        }

        if (node.status === 'unchanged') {
            return `${makeIndent(depth)}${key}: ${drawNode(value, depth)}`;
        }

        if (node.status === 'object') {
            return `${makeIndent(depth)}${key}: {\n${drawTree(value,
                depth + 1)}\n${makeIndent(depth)}}`;
        }
    }).join('\n');
};

export default (ast) => {
  return `{\n${drawTree(ast)}\n}`;
}