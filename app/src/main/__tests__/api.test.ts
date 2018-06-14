/**
 * @jest-environment node
 */

import { getD4LData } from "../api/d4l";


describe("D4L API", () => {
    it("should download data", async () => {

        const resData = await getD4LData();
        expect(resData.status).toBeUndefined();
    });
});

describe("Blockchain API", () => {
    it("should do something ;)", async () => {

        expect(1).toBe(1);
    });
});
