import { greet } from "./index"

describe("test", () => {
    it("should say hello", () => {
        expect(greet()).toBe("Hello world!")
    })
})