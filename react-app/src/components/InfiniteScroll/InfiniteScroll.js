import { Header, Segment } from "semantic-ui-react";
import InfiniteScroll from "react-bidirectional-infinite-scroll";
import React from "react";

export default function InfiniteScroll() {
  return (
    <InfiniteScroll horizontal onReachLeft={(f) => f} onReachRight={(f) => f}>
      <Segment circular size="tiny">
        <Header color="purple">
          Harvard Yard
          <Header.Subheader>Lock Id - 1636</Header.Subheader>
        </Header>
      </Segment>
      <Segment circular size="tiny">
        <Header color="purple">
          Mecca
          <Header.Subheader>Lock Id - 570</Header.Subheader>
        </Header>
      </Segment>
      <Segment circular size="tiny">
        <Header color="purple">
          Stephen Colbert
          <Header.Subheader>Lock Id - 1997</Header.Subheader>
        </Header>
      </Segment>
      <Segment circular size="tiny">
        <Header color="purple">
          The Sphinx
          <Header.Subheader>Lock Id - 12000</Header.Subheader>
        </Header>
      </Segment>
      <Segment circular size="tiny">
        <Header color="purple">
          The White House
          <Header.Subheader>Lock Id - 1776</Header.Subheader>
        </Header>
      </Segment>
      <Segment circular size="tiny">
        <Header color="purple">
          Willard Beach
          <Header.Subheader>Lock Id - 04106</Header.Subheader>
        </Header>
      </Segment>
    </InfiniteScroll>
  );
}
