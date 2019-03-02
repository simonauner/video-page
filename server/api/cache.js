import nodeCache from 'node-cache';

export class Cache {
    constructor(ttlSeconds = 30) {
        this.cache = new nodeCache({
            stdTTL: ttlSeconds,
            checkPeriod: ttlSeconds * 0.1,
        });
    }

    get(key, getUncachedValue) {
        const value = this.cache.get(key);

        if (!value) {
            return getUncachedValue().then(result => {
                this.cache.set(key, result);
                return result;
            });
        }

        return Promise.resolve(value);
    }

    set(key, value) {
        this.cache.set(key, value);
    }
}
