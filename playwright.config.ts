import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "node e2e/mock-api-server.mjs & export NEXT_PUBLIC_GET_VIDEOS_API_URL=http://127.0.0.1:4000/api/videos?user_id=; npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://127.0.0.1:3000",
  },
});
