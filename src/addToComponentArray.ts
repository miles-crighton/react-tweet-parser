import { ReactElement } from 'react';
import { ComponentArray } from '.';

/**
 * Slice in a React component to the component array at given indices,
 * make the additional unused spaces null
 * @param componentArray
 * @param component
 * @param indices
 */
export default function addToComponentArray(
  componentArray: ComponentArray,
  component: ReactElement,
  indices: number[] | null | undefined,
) {
  let newComponentArray = [...componentArray];
  if (Array.isArray(indices) && indices.length === 2) {
    const [start, end] = indices;
    newComponentArray = [
      ...componentArray.slice(0, start),
      ' ', // Include a trailing space after component
      component,
      ...new Array(end - start - 1).fill(null),
    ];
    if (end < componentArray.length) {
      [...newComponentArray, componentArray.slice(end + 1)];
    }
  }
  return newComponentArray;
}
