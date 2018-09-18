/**
 * Vérifie que le navigatuer est compatible
 * Possède Push API
 * Return true si c'est ok
 */
function checkBrowser() {
    return (('serviceWorker' in navigator) && ('PushManager' in window));
}

/**
 * Cette fonction charge en tâche de fond le service-worker
 * Le service-worker est
 *  - downloader sur le poste client du browser
 *  - Le javascript est ecécuté
 *  - Si tout c'est passé sans erreur alors la promise est excécuté avec succé et retour un ServiceWorkerRegistration
 *
 * Le ServiceWorkerRegistration va nous permettre d'accéder à l'API Push Manager
 * @returns {Promise<ServiceWorkerRegistration>}
 */
function registerServiceWorker() {
    return navigator.serviceWorker.register('js/service-worker.js')
        .then(function(registration) {
            console.log('Service worker successfully registered.');
            return registration;
        })
        .catch(function(err) {
            console.error('Unable to register service worker.', err);
        });
}

/**
 * Return une promise, ainsi la demande d'autorisation à l'utilisateur
 * peut se faire en asynchrone
 * @returns {Promise<any>}
 */
function askPermission() {
    return new Promise(function (resolve, reject) {

        Notification.requestPermission().then(function (result) {
            //
            if (result === 'denied') {
                reject('La permission n\'a pas été validé, les notifications sont bloquées');
            }
            if (result === 'default') {
                reject('La réponse à la requête pour la permission a été remis à plus tard.');
            }
            // Do something with the granted permission.
            resolve();
        })
    })
}

