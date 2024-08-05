import * as React from "react";
import Story from "./Story";

import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { NewsfeedQuery } from "./__generated__/NewsfeedQuery.graphql";

export default function Newsfeed() {
  const data = useLazyLoadQuery<NewsfeedQuery>(
    graphql`
      query NewsfeedQuery {
        topStory {
          ...StoryFragment
        }
      }
    `,
    {}
  );

  return (
    <div className="newsfeed">
      <Story dataRef={data.topStory} />
    </div>
  );
}
