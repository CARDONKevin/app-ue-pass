## Env de dev

Pour le serveur, on utilise le framework node Express, mais tout autre solution est viable

    $ docker build -t node/push .
    $ docker run -p 80:80 --name push -v `pwd`:/push node/push
    
Pour chaque test il faut redemarrer le container

    $ docker stop push
    $ docker start push
    
## VAPID Keys
Les clefs, et plus particulièrement la clef privé, ne doit pas être versionné
Le fichier contient les clefs sous la forme json suivante

    module.exports = {
        publicKey: "BN..."
        privateKey: "gM..."
    };
    
Dans le fichier app.js le require contient le path du fichier vapideKeys.js

    const vapidKeys = require('./NOTversioned/vapidKeys.js');
