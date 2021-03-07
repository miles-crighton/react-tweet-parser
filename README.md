# react-tweet-parse

![React Tweet Parse](https://github.com/miles-crighton/react-tweet-parse/blob/master/readme-image.png)

**What's the problem?**

[Twitter's API](https://developer.twitter.com/en/docs/twitter-api/v1) returns JSON consisting of a tweet's text along with an entities object that contains the positions of embedded elements such as hashtags and user mentions.

It's a bit fiddly breaking these embedded entities into React elements so this library does it for you and returns a populated set of links and spans so you can render the tweet's body with ease.

## How to use

The default export is `getTweetComponent` (can be explicitly imported too).

Simply pass a Tweet into `getTweetComponent` and it'll return a component containing `<span>`s and `<a>`s that can then be used within JSX.

```tsx
// JSX Component Example
import { getTweetComponent } from 'react-tweet-parse';

function TweetTile() {
  // ...
  // Fetch a tweet from your backend or pass it in as props
  // ...
  let fetchedTweet;
  const TweetBody = getTweetComponent({ tweet: fetchedTweet });

  return <TweetBody />;
}
```

`getTweetComponent` expects either a full tweet object or a tweet's text and entities so that each entity can be parsed.

```ts
import { getTweetComponent } from 'react-tweet-parse';

// Either pass a tweet object containing both full_text and entities:
getTweetComponent({ tweet: fetchedTweet });

// Or specify a tweet's text and entities separately:
getTweetComponent({ text: tweetText, entities: tweetEntities });
```

Each link will have its href set to the entities's corresponding url. For example hashtags link to the url `https://twitter.com/hashtags/<hashtag>`.

**If either the text or entities cannot be found the function will return false**

### getTweetComponentArray

If you need the individual components to add additional props instead use:

```ts
import { getTweetComponentArray } from 'react-tweet-parse';
getTweetComponentArray({ tweet: fetchedTweet });
```

This function takes the same arguments as `getTweetComponent` but returns an array of JSX Elements.

With access to each JSX element this allows manipulation of each element's props and can also allow for filtering of required components.

## Installation

Using your package manager of choice:

**NPM ⚙️**

`npm i react-tweet-parse`

**Yarn 🐈**

`yarn add react-tweet-parse`

## Types

You can also import tweet related types for convenience:

```ts
import type Tweet from 'react-tweet-parse';
```

`Tweet`: A status response from Twitter's API

`Entities`: The entities object contained within a status response

`MediaEntity`: An entity representing a piece of media embedded in a status

`UrlEntity`:An entity representing a url mentioned in a status

`HashtagEntity`: An entity representing a hashtag mentioned in a status

`UserMentionEntity`: An entity representing a user mentioned in a status

These types are maintained by [twitter-d](https://github.com/abraham/twitter-d) if you want to grab them from the source.
