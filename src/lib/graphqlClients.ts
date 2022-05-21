import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_URL_ENDPOINT || "https://graphql-endpoint.example/api/v1";

export const graphcms = process.env.NEXT_CMS_GCMS_AUTH_TOKEN
  ? new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${process.env.NEXT_CMS_GCMS_AUTH_TOKEN}`,
      },
    })
  : new GraphQLClient(endpoint);
