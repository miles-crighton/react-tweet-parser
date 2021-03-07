import React from 'react';
import { HashtagEntity, MediaEntity, UrlEntity, UserMentionEntity } from 'twitter-d';
import { ComponentArray } from '.';
import addToComponentArray from './addToComponentArray';

export function parseMedia(mediaEntities: MediaEntity[] | null | undefined, componentArray: ComponentArray) {
  let newComponentArray = [...componentArray];

  if (Array.isArray(mediaEntities)) {
    mediaEntities.forEach((mediaEntity) => {
      const { indices, media_url: mediaUrl, url, sizes } = mediaEntity;
      const [start, end] = indices;

      newComponentArray = [
        ...componentArray.slice(0, start),
        ...new Array(end - start - 2).fill(null),
        ...componentArray.slice(end + 1, componentArray.length + 1),
      ];
    });
  }

  return newComponentArray;
}

export function parseHashtags(hashtagEntites: HashtagEntity[] | null | undefined, componentArray: ComponentArray) {
  let newComponentArray = [...componentArray];

  if (Array.isArray(hashtagEntites)) {
    hashtagEntites.forEach((hashtag) => {
      const { indices, text } = hashtag;
      const component = (
        <a href={`https://twitter.com/hashtag/${text}`} target="_blank">
          {'#'}
          {text}
        </a>
      );
      newComponentArray = addToComponentArray(newComponentArray, component, indices);
    });
  }

  return newComponentArray;
}

export function parseUserMentions(
  userMentionEntites: UserMentionEntity[] | null | undefined,
  componentArray: ComponentArray,
) {
  let newComponentArray = [...componentArray];

  if (Array.isArray(userMentionEntites)) {
    userMentionEntites.forEach((userMention) => {
      const { indices, screen_name } = userMention;
      const component = (
        <a href={`https://twitter.com/${screen_name}`} target="_blank">
          @{screen_name}
        </a>
      );
      newComponentArray = addToComponentArray(newComponentArray, component, indices);
    });
  }

  return newComponentArray;
}

export function parseUrls(urlEntites: UrlEntity[] | null | undefined, componentArray: ComponentArray) {
  let newComponentArray = [...componentArray];

  if (Array.isArray(urlEntites)) {
    urlEntites.forEach((urlEntity) => {
      const { indices, expanded_url, display_url } = urlEntity;
      const component = (
        <a href={expanded_url} target="_blank">
          {display_url}
        </a>
      );
      newComponentArray = addToComponentArray(newComponentArray, component, indices);
    });
  }

  return newComponentArray;
}
