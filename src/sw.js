workbox.core.setCacheNameDetails({
    prefix: "findmypet"
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute('/index.html');

self.addEventListener("message", event => {
    if (event.data === "skipWaiting") {
        self.skipWaiting();
    }
});


self.addEventListener('push', event => {
    try {
        const push_data = event.data.json()

        if (push_data.kind === 'zone-alert') {
            let options = {
                body: `${push_data.args.name} is over security zone !`,
                icon: '/img/icons/android-chrome-512x512.png',
                data: push_data
            }
            if (push_data.args.picture) options.image = push_data.args.picture
            event.waitUntil(self.registration.showNotification(
                `${push_data.args.name} location alert`,
                options
            ))
        }
    } catch { }
})