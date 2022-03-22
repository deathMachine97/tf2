import 'mocha';
import { expect } from "chai"
import { Config } from '../../sys/classes/Config'


describe('sys/ConfigClass test', () => { // the tests container
    it('Get Instance', () => {
        const config = Config.getInstance();
        expect(config).is.instanceOf(Config);
	});

    it('Get a real config value', function () {
        expect(Config.getInstance().get('uri')).not.undefined.not.null;
    });


    it('Get a not real config value', function () {
        expect(Config.getInstance().get('aaswefr2324')).to.satisfies(function (value: any) {
            return value === undefined || value === null;
        });
    });
    // 	expect(expenses).not.to.be.undefined;
    // });
})
