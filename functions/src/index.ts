import {setGlobalOptions} from "firebase-functions/v2";
import {onRequest} from "firebase-functions/v2/https";
import next from "next";

setGlobalOptions({ maxInstances: 10 });

const dev = false;
const nextApp = next({
  dev,
  conf: {
    distDir: ".next",
  },
});

const handle = nextApp.getRequestHandler();

let isReady = false;

export const nextjsFunc = onRequest(
  {
    memory: "1GiB",
    timeoutSeconds: 300,
    minInstances: 0,
  },
  async (req, res) => {
    if (!isReady) {
      await nextApp.prepare();
      isReady = true;
    }
    return handle(req, res);
  }
);
