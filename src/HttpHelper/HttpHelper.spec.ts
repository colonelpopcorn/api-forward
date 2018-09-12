import HttpHelper from "./HttpHelper"
import { assert } from "chai";

describe('ApiForward.HttpHelper', function() {

  describe('#normalizePort(portNumber, defaultPort)', function() {
    it("Should return the same string when passed a string.", function() {
      const server = HttpHelper;
      const testStr = "Something stupid";

      let normalizedPort = server.normalizePort(testStr, 8080);

      assert.strictEqual(normalizedPort, testStr);
    });

    it("Should return a number when passed a number.", function() {
      const server = HttpHelper;

      let normalizedPort = server.normalizePort("9000", 8080);

      assert.strictEqual(normalizedPort, 9000);
    })

  });

  describe("#getEventListeners()", function() {
    it("Should return an object with functions in it.", function() {
      const listeners = HttpHelper.getEventListeners();

      assert.isFunction(listeners.onError);
      assert.isFunction(listeners.onListening);
    })
  });

  describe("#createServer", function() {

  });
});
