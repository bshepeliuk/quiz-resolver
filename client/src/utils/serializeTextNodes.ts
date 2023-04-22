import { Node } from 'slate';

export const serializeSlateNodes = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};
