self.addEventListener('push', function(event) {
    if (event.data) {
        console.log('Donnée de l\'évenement push : ', event.data.text());
    } else {
        console.log('Pas de donner pour l\événement push.');
    }
});
