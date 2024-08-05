import * as React from "react";
import Card from "./Card";
import Heading from "./Heading";
import PosterByline, { type Props as PosterBylineProps } from "./PosterByline";
import StorySummary from "./StorySummary";
import Image from "./Image";

import { graphql } from "relay-runtime";
import { useRefetchableFragment } from "react-relay";
import { StoryFragment$key } from "./__generated__/StoryFragment.graphql";

type Props = {
  dataRef: StoryFragment$key;
};

export default function Story({ dataRef }: Props): React.ReactElement {
  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment StoryFragment on Story
      @refetchable(queryName: "StoryFragmentQuery") {
        id
        title
        summary
        createdAt
        poster {
          name
          profilePicture {
            url
          }
        }
        thumbnail {
          url
        }
      }
    `,
    dataRef
  );

  const handleRefetch = React.useCallback(() => {
    return new Promise((resolve) => {
      const requestId = Math.random().toString(36).substring(2, 9);

      console.log("refetching...", requestId);
      refetch(
        { id: data.id },
        {
          fetchPolicy: "store-and-network",
          onComplete: () => {
            resolve(requestId);
            console.log("refetch completed...", requestId);
          },
        }
      );
    });
  }, [refetch]);

  return (
    <Card>
      <button
        onClick={() =>
          handleRefetch().then((requestId) => {
            console.log("indded refetch completed", requestId);
          })
        }
      >
        refresh!
      </button>
      <PosterByline poster={data.poster} />
      <Heading>{data.title}</Heading>
      <Image image={data.thumbnail} width={400} height={400} />
      <StorySummary summary={data.summary} />
    </Card>
  );
}
