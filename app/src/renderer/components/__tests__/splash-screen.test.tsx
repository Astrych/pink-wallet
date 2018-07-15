
import { calcProgressSteps } from "../splash-screen";


describe("Splash screen progress list", () => {
    it("should be correct", () => {

        const progressList = [];

        const total = 10;
        const subSteps = 2;

        for (let i = 0; i < total; ++i) {
            progressList.push(...calcProgressSteps({ step: i, total, subSteps }));
        }

        expect(progressList).toEqual([
                5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
                55, 60, 65, 70, 75, 80, 85, 90, 95, 100
        ]);
    });
});
