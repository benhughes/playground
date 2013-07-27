window.PatternDetection = function () {
    "use strict";
    var total = 0,
        average = 0,
        numberSteps = 0,
        previousStep = 0,
        baseline = 0,
        isBaseline = true,
        settings = {
            round: 2,
            buffer: 0.1,
            settleLength: 4
        },
        patternsToMatch = [],
        directionStartValue = 0,
        currentMotion = "baseline",
        previousMotion = "baseline",
        currentPattern = [],
        patternsFound = [],
        roundTo = function (number, decimalPlace) {
            decimalPlace = (decimalPlace) ? decimalPlace : 0;
            decimalPlace = Math.pow(10, decimalPlace);
            return Math.floor(number * decimalPlace) / decimalPlace;
        },
        addCurrentPattern = function () {
            console.log(previousMotion);
            if (currentMotion !== previousMotion) {
                currentPattern.push(currentMotion);
            }

        },
        matchPattern = function () {
            var i, x, length = patternsToMatch.length, match;
            console.log(currentPattern, patternsToMatch);
            for (i = 0; i < length; i++) {
                match = true;
                console.log(patternsToMatch[i]);
                for (x = 0; x < currentPattern.length; x++) {
                    console.log(currentPattern[x], patternsToMatch[i].pattern);
                    console.log(patternsToMatch[i].pattern.indexOf(currentPattern[x]));
                    if (patternsToMatch[i].pattern[x] !== currentPattern[x]) {
                        match = false;
                    }

                }
                if (match && typeof patternsToMatch[i].callback === 'function') {
                    console.log('found match');
                    patternsToMatch[i].callback();
                }

            }
        };


    return {
        step: function (value) {
            console.log('new step: ', value);
            value = roundTo(value, settings.round);

            total += value;
            numberSteps++;
            average = total / numberSteps;

            if (numberSteps < settings.settleLength) {
                console.log('settling still in progress, finding baseline');
                previousStep = value;
                return;
            } else if (numberSteps === settings.settleLength) {
                console.log('baseline is ', average);
                baseline = average;
                directionStartValue = value;
            }

            isBaseline = (value < baseline + settings.buffer && value > baseline - settings.buffer);

            if (value > previousStep) {
                currentMotion = "up";
            } else if (value < previousStep) {
                currentMotion = "down";
            }

            if (!isBaseline) {
                addCurrentPattern();
                console.log('value not baseline adding ', currentMotion, "to to the pattern", currentPattern);

            } else if (currentPattern.length > 0) {
                console.log('We\'re back at baseline adding', currentMotion, "to to the pattern", currentPattern);

                addCurrentPattern();
                patternsFound.push(currentPattern);
                matchPattern();
                currentMotion = "baseline";

                currentPattern = [];

            } else {
                currentMotion = "baseline";

            }

            previousStep = value;
            previousMotion = currentMotion;

        },
        settings: function (userSettings) {
            for (var i in userSettings) {
                if (userSettings.hasOwnProperty(i)) {
                    settings[i] = userSettings[i];
                }
            }
            console.log('settings changes to ', settings);

        },
        getPatternsFound: function () {
            return patternsFound;
        },
        addPatternListener: function (pattern, callback) {
            patternsToMatch.push({
                pattern: pattern,
                callback: callback
            });
        }

    };
};