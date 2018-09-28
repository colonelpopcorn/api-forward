/* tslint:disable only-arrow-functions */
import { assert } from "chai";
import HttpHelper from "./HttpHelper";

describe("ApiForward.HttpHelper", function() {

  describe("#normalizePort(portNumber, defaultPort)", function() {
    it("Should return the same string when passed a string", function() {
      const server = HttpHelper;
      const testStr = "Something stupid";

      const normalizedPort = server.normalizePort(testStr, 8080);

      assert.strictEqual(normalizedPort, testStr);
    });

    it("Should return a number when passed a number", function() {
      const server = HttpHelper;

      const normalizedPort = server.normalizePort("9000", 8080);

      assert.strictEqual(normalizedPort, 9000);
    });

  });

  describe("#createServer", function() {
    it("Should return an http server that is configured correctly", function() {
      const app = () => { /* unnecessary comment for tslint */};
      const httpPort = 9000;
      const server = HttpHelper.createServer(
        {
          app,
          debugFunc: () => { /* unnecessary comment for tslint */},
          httpPort,
        },
          false,
        );

      assert.isNotEmpty(server);
    });
  });
});
