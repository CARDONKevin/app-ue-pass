## Env de dev

Pour le serveur, on utilise le framework node Express, mais tout autre solution est viable

    $ docker build -t node/push .
    $ docker run -p 80:80 --name push -v `pwd`:/push node/push
    
Pour chaque test il faut redemarrer le container

    $ docker stop push
    $ docker start push