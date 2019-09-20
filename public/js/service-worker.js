var CACHE_NAME = 'notifications';

self.addEventListener('push', function(event) {
    let msg = event.data.json()
    const promiseChain = self.registration.showNotification(msg.title, msg.options);


    event.waitUntil(updateNumber('visible').then(function() {
        getCacheNumber();
        promiseChain;
      }));
});

function updateNumber(type) {
  return caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(type).then(function(response) {
          return response.json().then(function(notificationNum) {
              var newNotificationNum = notificationNum + 1;

              return cache.put(
                  new Request(type),
                  new Response(JSON.stringify(newNotificationNum), {
                      headers: {
                          'content-type': 'application/json',
                      },
                  })
              ).then(function() {
                  return newNotificationNum;
              });
          });
      });
  });
}

function getCacheNumber(type) {
    return caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(type).then(function(response) {
            return response.json().then(function(notificationNum) {
                if (notificationNum > 0){
                    document.getElementById("not_env").innerHTML = document.getElementById("not_env").innerHTML + notificationNum;
                    console.log(document.getElementById("not_env").innerHTML + notificationNum);
                }  else {
                    document.getElementById("not_env").innerHTML = document.getElementById("not_env").innerHTML + 0;
                    console.log(document.getElementById("not_env").innerHTML + 0);
                }
            });
        });
    });
}
