export function getRandom(min, max, fixed=0) {
    let differ = max - min
    let random = Math.random()
    return (min + differ * random).toFixed(fixed)
}

export function numbers(config) {
    let cfg =  {
        min: 0,
        max: 100,
        count: 10,
        ...config
    };
    let min = cfg.min;
    let max = cfg.max;
    let count = cfg.count;
    let data = [];
    let i, value;

    for (i = 0; i < count; ++i) {
        value = getRandom(min, max);
        if (value) {
            data.push(value);
        } else {
            data.push(null);
        }
    }

    return data;
}
