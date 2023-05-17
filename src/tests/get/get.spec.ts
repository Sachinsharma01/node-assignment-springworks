import { expect, assert, use, request} from 'chai';
import chaiHttp from "chai-http";
use(chaiHttp);

export const getTestCases = (server: any) => {
  it("Testcase 1", async () => {
    const response: any = await request(server).get("/api/notes/");
    expect(response).to.have.status(200);
    expect(response.error).equal(false);
    expect(response.body).to.have.keys(["error", "message", "data"]);
    expect(response.body.data).to.be.an("array");
    expect(response.body.data[0]).to.have.keys(["noteId", "note"]);
  });

  it("Testcase 2", async () => {
    const response: any = await request(server).get("/api/notes/");
    expect(response).to.have.status(200);
    assert.typeOf(response.body.error, 'boolean')
    expect(response.body.error).equal(false);
    expect(response.body.data).to.not.be.undefined
  });
};
