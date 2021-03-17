import React, { ReactElement } from 'react';
import { Status, Entities } from 'twitter-d';
export { Status, Entities, MediaEntity, UrlEntity, HashtagEntity, UserMentionEntity } from 'twitter-d';

import consolidateComponentArray from './consolidateComponentArray';
import { parseHashtags, parseMedia, parseUrls, parseUserMentions } from './parsers';

export type Tweet = Status;
export type ComponentArray = Array<JSX.Element | string | null>;

interface GetTweetComponentArrayArgs {
  text?: string;
  entities?: Entities;
  tweet?: Status;
}

/**
 * Create a tweet component including links and spans from a tweets text and embedded entities
 * @param { text, entities, tweet } - Either a full tweet OR a tweet's text and entities
 * @returns Component: (JSX.Element) - Use with <Component /> in a JSX transformer
 */
export function createTweetComponent({ text, entities, tweet }: GetTweetComponentArrayArgs) {
  // Create tweet component array
  const componentArray = getTweetComponentArray({ text, entities, tweet });

  // Error occured return false
  if (!componentArray) {
    return false;
  }

  // Construct final React component from componentArray
  const finalComponent = (
    <>
      {componentArray.map((x, idx) => {
        if (typeof x !== 'string' && x !== null) {
          return React.cloneElement(x, { key: idx });
        } else {
          return x;
        }
      })}
    </>
  );

  return finalComponent;
}

export default createTweetComponent;

/**
 * Create an ordered array of JSX <span>s and <a>s representing text and embedded links with a tweet
 * @param { text, entities, tweet } - Either a full tweet OR a tweet's text and entities
 * @returns [Component: (JSX.Element)] - An array of ordered JSX Elements representing a tweet's text and embedded links
 */
export function getTweetComponentArray({ text, entities, tweet }: GetTweetComponentArrayArgs) {
  let tweetText = text;
  let tweetEntities = entities;

  if (tweet) {
    tweetText = tweet.full_text;
    entities = tweet.entities;
  }

  // If either the text or entities is not provided return false
  if (!tweetText || !tweetEntities) {
    return false;
  }

  // Component array formed from tweet text split into individual characters
  let componentArray: Array<string | ReactElement | null> = tweetText.split('');

  // Parse entities
  componentArray = parseMedia(tweetEntities.media, componentArray);
  componentArray = parseHashtags(tweetEntities.hashtags, componentArray);
  componentArray = parseUserMentions(tweetEntities.user_mentions, componentArray);
  componentArray = parseUrls(tweetEntities.urls, componentArray);

  // Consolidate component array
  const component = consolidateComponentArray(componentArray);

  return component;
}
