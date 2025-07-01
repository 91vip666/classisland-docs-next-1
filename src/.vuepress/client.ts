import { defineClientConfig } from 'vuepress/client'
import * as Sentry from "@sentry/vue";

import UnderConstruction from "./comps/UnderConstruction.vue";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    Sentry.init({
        app,
        dsn: "https://f300bd95cb322030809d33bcf5bb8fa2@sentry.classisland.tech/6",
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration(),
        ],
        // Tracing
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
      });

    app.component("UnderConstruction", UnderConstruction);
  },
  setup() {},
  rootComponents: [],
})