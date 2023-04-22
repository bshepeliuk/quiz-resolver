import { Descendant } from 'slate';

interface TextNode {
  text: string;
}

interface ElementNode {
  type: string;
  children: Descendant[];
}

type DescendantType = TextNode | ElementNode;

export const toSlateElementNodes = (items: string[]): DescendantType[] => {
  return items.map((item) => ({
    type: 'paragraph',
    children: [{ text: item }],
  }));
};
