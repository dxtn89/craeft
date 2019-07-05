import Timer from "../tools/timer";
import Resources from "./resources";
import {
    ResourceTypes
} from "./data/types";
import {
    getRandomArrayItem
} from "../tools/rand";
import {
    pow,
    log
} from "mathjs";

export default class Farm {

    constructor({
                    delay = global.delay || 2
                } = {}) {
        this.delay = delay;
        this.timer = new Timer({
            delay,
            autoStart: false
        });

        this.counter = 0;
    }

    static hydrate(obj) {
        const farm = Object.assign(new Farm(), obj);

        farm.timer = Timer.hydrate(obj.timer);

        return farm;
    }

    start({
              player,
              callback
          } = {}) {

        let delay = this.delay * pow(log(this.counter + 2), 5);

        delay = delay < 1 ? this.delay : delay;

        this.timer = new Timer({
            delay,
            autoStart: false
        });

        this.timer.callback = () => {

            this.timer.pause();

            // calculate amount of all resources first
            var amount = player.level;

            // now distribute

            const resources = {};
            const resTypes = [
                ResourceTypes.Wood,
                ResourceTypes.Metal,
                ResourceTypes.Cloth,
                ResourceTypes.Diamond
            ];

            while (amount > 0) {

                const resType = getRandomArrayItem({
                    array: resTypes
                });

                resources[resType] = resources[resType] ? resources[resType]++ : 1;

                amount--;
            }

            this.counter++;

            callback({
                // todo calculate result based on level
                result: new Resources({
                    resources
                }),
                // todo calculate exp based on farm level
                exp: 10,
                // todo calculate dmg based on defense and dmg dealt
                dmg: 1,
                // todo calculate stamina used
                usedStamina: 2
            });

        };

        this.timer.start();
    }
}