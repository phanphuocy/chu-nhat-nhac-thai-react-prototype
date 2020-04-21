import { createClient } from "contentful";

export default class ContentfulClient {
  getClient = async () => {
    const client = await createClient({
      space: CONTENTFUL_SPACE,
      accessToken: CONTENTFUL_TOKEN,
    });
    return client;
  };
}
