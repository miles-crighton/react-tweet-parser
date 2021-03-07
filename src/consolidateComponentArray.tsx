import React from 'react';
import { ComponentArray } from '.';

/**
 * Consolidate array of strings and components into a single component array
 * of spans and links
 * @param componentArray
 * @returns
 */
export default function consolidateComponentArray(componentArray: ComponentArray) {
  const component = [];
  // Consilidate strings and components in componentArray
  let spanBeginIdx = null;
  for (let i = 0; i < componentArray.length; i++) {
    // When we reach a null, check if a string was already begun, to add it as a span
    if (componentArray[i] === null) {
      if (spanBeginIdx !== null) {
        component.push(<span>{componentArray.slice(spanBeginIdx, i).join('')}</span>);
        spanBeginIdx = null;
      }
      continue;
    }

    // Handle whether we find a string or a component in the array
    if (typeof componentArray[i] === 'string') {
      if (spanBeginIdx === null) {
        spanBeginIdx = i;
      }
      if (i >= componentArray.length - 1) {
        component.push(<span>{componentArray.slice(spanBeginIdx, i).join('')}</span>);
      }
    } else {
      // When reaching a component, add a span of text up to that point and reset start idx
      if (spanBeginIdx !== null) {
        component.push(<span>{componentArray.slice(spanBeginIdx, i).join('')}</span>);
        spanBeginIdx = null;
      }

      // Add the component to the array
      component.push(componentArray[i]);
    }
  }
  return component;
}
