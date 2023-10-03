// eslint-disable-next-line no-restricted-globals
self.oninstall = function(event) {
    console.log('sw installed..');
    event.waitUntil(cacheAssets());
}

// eslint-disable-next-line no-restricted-globals
self.onactivated = function(event) {
    console.log('sw activated..');
}

async function cacheAssets(){
    let cache = await caches.open('gehweg');
    return cache.addAll(['/']);
}
