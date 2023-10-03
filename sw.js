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

async function fetchResource(request) {
    let cache = await caches.open('gehweg');
    let response = await caches.match(request);

   
    if (!response) {
        try {
        response = await fetch(request);
        await cache.put(request, response.clone());
        } catch (error) {
            return new Response(`Resource ${request.url} not found`);
        }
    }
    return response;
} 