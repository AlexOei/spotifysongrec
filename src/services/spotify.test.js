import spotify from "./spotify"
import axios from "axios"

jest.mock("axios")

describe("spotify", () => {
    test("request", async () => {

        const result = await spotify.request('GET', 'string', 'token')
        expect(axios).toHaveBeenCalledTimes(1);

    })
})