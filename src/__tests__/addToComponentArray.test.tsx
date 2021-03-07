import React from 'react';
import addToComponentArray from '../addToComponentArray';

test('addToComponentArray', () => {
  const component = <div></div>;
  expect(addToComponentArray(['1', '2', '3'], component, [0, 1])).toStrictEqual([<div />, null, null, ' ', '3']);
});
