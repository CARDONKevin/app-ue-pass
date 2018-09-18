/**
 * Vérifie que le navigatuer est compatible
 * Possède Push API
 * Return true si c'est ok
 */
function checkBrowser() {
    return (('serviceWorker' in navigator) && ('PushManager' in window));
}

