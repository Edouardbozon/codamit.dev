import { html } from "lit-html";

async function getTweets(): Promise<any> {
  const resp = await fetch(`http://localhost:8081/api/v1/tweets`, {
    method: "GET",
    mode: "cors",
    cache: "default",
  });

  return resp.json();
}

const showTweets = (resp: any) =>
  resp.statuses.map(
    (tweet: any) => html`
      <article>${tweet.text}</article>
    `,
  );

export const twitterFeed = async () => {
  const resp = await getTweets();

  return html`
  <style scoped>
    .twitter-feed {
      padding-top: 40px;
      margin-top: 40px;
      border-top: 2px solid #dfdfdf;
    }

    article {
      padding: 1.4rem;
      margin-bottom: 4px;
      background: #dfdfdf;
      border-radius: 2px;
    }
  </style>
  <section class="twitter-feed">
    ${showTweets(resp)}
  </section>
`;
};
