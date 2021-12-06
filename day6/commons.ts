export interface ITimerMap {
    [timer: number]: number;
}

export const initializeMap = (timers: number[]) => {
    let timerMap: ITimerMap = {};

    for (let timer of timers) {
        if (!(timer in timerMap)) {
            timerMap[timer] = 0;
        }

        timerMap[timer]++;
    }

    return timerMap;
};

export const simulateTime = (timerMap: ITimerMap, days: number) => {
    let t: ITimerMap = { ...timerMap };

    for (let i = 1; i <= days; i++) {
        const newMap: ITimerMap = {};

        for (let timer in t) {
            const timerValue = +timer;

            if (timerValue === 0) {
                newMap[6] = t[0];
                newMap[8] = t[0];
            } else {
                newMap[timerValue - 1] =
                    (newMap[timerValue - 1] || 0) + t[timerValue];
            }
        }

        t = newMap;
    }

    return t;
};

export const countTimers = (timerMap: ITimerMap) => {
    return Object.keys(timerMap).reduce((sum, key) => {
        return sum + timerMap[+key];
    }, 0);
};
