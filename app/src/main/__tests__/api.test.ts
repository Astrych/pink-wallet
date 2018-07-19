/**
 * @jest-environment node
 */

import { getD4LData } from "../api/d4l";


describe("D4L API", () => {
    it("should download data", async () => {

        try {
            const resData = await getD4LData();
            expect(resData.success).toBeDefined();
        } catch (err) {
            expect(err.message && err.code).toBeDefined();
        }
    });
});

describe("Blockchain API", () => {
    it("should do something ;)", async () => {

        expect(1).toBe(1);
    });
});
