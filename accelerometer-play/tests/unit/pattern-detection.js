describe("pattern-detection", function () {
    "use strict";
    var patternClass;
    beforeEach(function () {
        patternClass = new PatternDetection();
    });
    describe("to be true", function () {
        it('should be true', function () {
            expect(true).toBe(true);
        });
    });
    describe("step", function () {
        it("should find simple patterns", function () {

            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-9);
            patternClass.step(-6);
            patternClass.step(-6);

            var patternsFound = patternClass.getPatternsFound();
            console.log(patternsFound);

            expect(typeof patternsFound).toBe('object');
            expect(patternsFound.length).toBe(1);
            expect(patternsFound[0].length).toBe(2);
            expect(patternsFound[0][0]).toBe("down");
            expect(patternsFound[0][1]).toBe("up");
        });
        it("should find multi directional patterns", function () {

            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(10);
            patternClass.step(-9);
            patternClass.step(-6);

            var patternsFound = patternClass.getPatternsFound();
            console.log(patternsFound);

            expect(typeof patternsFound).toBe('object');
            expect(patternsFound.length).toBe(1);
            expect(patternsFound[0].length).toBe(3);
            expect(patternsFound[0][0]).toBe("up");
            expect(patternsFound[0][1]).toBe("down");
            expect(patternsFound[0][2]).toBe("up");
        });
        it("should combine when one or more steps head in the same direction", function () {

            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(10);
            patternClass.step(13);
            patternClass.step(-9);
            patternClass.step(-6);

            var patternsFound = patternClass.getPatternsFound();
            console.log(patternsFound);

            expect(typeof patternsFound).toBe('object');
            expect(patternsFound.length).toBe(1);
            expect(patternsFound[0].length).toBe(3);
            expect(patternsFound[0][0]).toBe("up");
            expect(patternsFound[0][1]).toBe("down");
            expect(patternsFound[0][2]).toBe("up");
        });
        it("should find multiple patterns", function () {

            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(10);
            patternClass.step(13);
            patternClass.step(-9);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-10);
            patternClass.step(13);
            patternClass.step(-9);
            patternClass.step(-6);

            var patternsFound = patternClass.getPatternsFound();
            console.log(patternsFound);

            expect(typeof patternsFound).toBe('object');
            expect(patternsFound.length).toBe(2);
            expect(patternsFound[0].length).toBe(3);
            expect(patternsFound[0][0]).toBe("up");
            expect(patternsFound[0][1]).toBe("down");
            expect(patternsFound[0][2]).toBe("up");

            expect(patternsFound[1].length).toBe(4);
            expect(patternsFound[1][0]).toBe("down");
            expect(patternsFound[1][1]).toBe("up");
            expect(patternsFound[1][2]).toBe("down");
            expect(patternsFound[1][3]).toBe("up");
        });
        it("should find complicated patterns", function () {

            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-9);
            patternClass.step(-8);
            patternClass.step(10);
            patternClass.step(13);
            patternClass.step(-9);
            patternClass.step(-7);
            patternClass.step(-5);
            patternClass.step(10);
            patternClass.step(13);
            patternClass.step(-9);
            patternClass.step(-6);

            var patternsFound = patternClass.getPatternsFound();
            console.log(patternsFound);

            expect(typeof patternsFound).toBe('object');
            expect(patternsFound.length).toBe(1);
            expect(patternsFound[0].length).toBe(6);
            expect(patternsFound[0][0]).toBe("down");
            expect(patternsFound[0][1]).toBe("up");
            expect(patternsFound[0][2]).toBe("down");
            expect(patternsFound[0][3]).toBe("up");
            expect(patternsFound[0][4]).toBe("down");
            expect(patternsFound[0][5]).toBe("up");

        });
        it("should ignore certain steps if buffer is increased", function () {
            patternClass.settings({buffer: 2});

            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-7);
            patternClass.step(-5);
            patternClass.step(10);
            patternClass.step(13);
            patternClass.step(-5);

            var patternsFound = patternClass.getPatternsFound();
            console.log(patternsFound);

            expect(patternsFound.length).toBe(1);
            expect(patternsFound[0].length).toBe(2);
            expect(patternsFound[0][0]).toBe("up");
            expect(patternsFound[0][1]).toBe("down");

        });



    });
    describe('addPatternListener', function () {
        it('should call function when pattern matches', function () {
            var testCallback = jasmine.createSpy();
            patternClass.addPatternListener(['up', 'down'], testCallback);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);

            expect(testCallback).toHaveBeenCalled();
        });
        it('should call function twice when pattern matches two times', function () {
            var testCallback = jasmine.createSpy();
            patternClass.addPatternListener(['up', 'down'], testCallback);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(6);
            patternClass.step(-6);
            patternClass.step(6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);

            expect(testCallback.callCount).toBe(2);
        });
        it('should handle 2 different pattern matchers and call their respective functions', function () {
            var testCallback2 = jasmine.createSpy(),
                testCallback1 = jasmine.createSpy();
            patternClass.addPatternListener(['up', 'down'], testCallback1);
            patternClass.addPatternListener(['down', 'up'], testCallback2);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(6);
            patternClass.step(-6);
            patternClass.step(-9);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);

            expect(testCallback1).toHaveBeenCalled();
            expect(testCallback2).toHaveBeenCalled();
        });
        it('should not call function pattern does not match', function () {
            var testCallback = jasmine.createSpy();
            patternClass.addPatternListener(['down', 'up'], testCallback);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(6);
            patternClass.step(-6);
            patternClass.step(6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);
            patternClass.step(-6);

            expect(testCallback).not.toHaveBeenCalled();
        });
    });
});