import Server from "./Server"
import * as assert from "assert";

describe('Server class', () => {
  describe('#ctor()', () => {
    it("Should have the right values when you construct it.", () => {
      const TEST_PORT = "9000";
      const TEST_DEFAULT_PORT = 8080;
      let server = new Server(TEST_PORT, TEST_DEFAULT_PORT);

      assert.equal(server.PortNumber, 9000);
      assert.equal(server.defaultPort, 8080);
    })
  });
});
