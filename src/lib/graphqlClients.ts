import { GraphQLClient } from "graphql-request";

export const graphcms = process.env.NEXT_CMS_GCMS_AUTH_TOKEN
  ? new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT!, {
      headers: {
        authorization: `Bearer ${process.env.NEXT_CMS_GCMS_AUTH_TOKEN}`,
      },
    })
  : new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT!);
