import React from 'react';
import addToComponentArray from '../addToComponentArray';
import { getTweetComponentArray } from '../index';
import multipleHashtagsSet from './testsets/multipleHashtags.json';

test('addToComponentArray', () => {
  const component = <div></div>;
  expect(addToComponentArray(['1', '2', '3'], component, [0, 1])).toStrictEqual([<div />, null, ' ', '3']);
});

test('general', () => {
  const tweetArray = getTweetComponentArray({
    text: multipleHashtagsSet.text,
    entities: multipleHashtagsSet.entities as any,
  }) as JSX.Element[];

  const childrenStringText = tweetArray.map((x) => x.props.children);
  const stringText = childrenStringText.join('');

  expect(stringText).toBe(
    '"📷 by @alexepplerwilliams: Official Plant-Based Nutrition Graduate 🍎🥦🥕 #ecornell #nutritionstudies #plantbased #plantbasednutrition #plantbasedcertificate #plantbasedcourse #wholefoodplantbaseddiet',
  );
});
