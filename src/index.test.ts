import { greet } from "./index"

describe("environnement is set", () => {
    it("should be able to retrieve Marvel API Token", () => {
        expect(process.env.MARVEL_API_KEY).not.toBeFalsy();
    })
})