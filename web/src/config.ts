import { StrapiService, type CMSService } from "./service/CMSService";

type Config = {
  cms: {
    type: string;
    config: {
      [key: string]: {
        client: CMSService;
      };
    };
  };
};

const config: Config = {
  cms: {
    type: import.meta.env.VITE_CMS_TYPE || "strapi",
    config: {
      strapi: {
        client: new StrapiService(
          import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337/api",
          import.meta.env.VITE_STRAPI_API_TOKEN || undefined
        ),
      },
    },
  },
};

export default config;
