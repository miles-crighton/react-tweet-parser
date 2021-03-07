import React, { ReactElement } from 'react';
import { Status } from 'twitter-d';
import consolidateComponentArray from './consolidateComponentArray';
import { parseHashtags, parseMedia, parseUrls, parseUserMentions } from './parsers';

export type Tweet = Status;
export type ComponentArray = Array<ReactElement | string | null>;

// @todo: Allow user to pass a single tweet in or it's text and entities
export default function parseTweetText(text: string, entities: Status['entities']) {
  // Component array formed from tweet text split into individual characters
  let componentArray: Array<string | ReactElement | null> = text.split('');

  // Parse entities
  componentArray = parseMedia(entities.media, componentArray);
  componentArray = parseHashtags(entities.hashtags, componentArray);
  componentArray = parseUserMentions(entities.user_mentions, componentArray);
  componentArray = parseUrls(entities.urls, componentArray);

  // Consolidate component array
  const component = consolidateComponentArray(componentArray);

  // Construct final React component
  const finalComponent = <>{component.map((x) => x)}</>;

  return finalComponent;
}
