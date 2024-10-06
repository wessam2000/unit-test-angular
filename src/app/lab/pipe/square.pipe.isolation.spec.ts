import { SquarePipeForLab } from "./square.pipe"

describe("1-square pipe (class only) testing:",()=>{

    it("expect to return 16 when passing 4",()=>{

        expect(new SquarePipeForLab().transform(4)).toBe(16)
    })
    it("expect to return 'Not a number' when passing wrong parameter",()=>{

        expect(new SquarePipeForLab().transform(null)).toBe('Not a number')
    })
})