/*

Init

 */

EasyPWA.init({
  'swPath': '/sw.js',
  'registrationOptions': {scope: '/'},
  'debug': true,
  'desktop': true,
}).then(function() {
  console.log('EasyPWA initialized');
});

/*

Home Screen

 */

window.addEventListener('easy-pwa-helper-available', function (e) {
  document.getElementById('homescreen_invite_event_received').style.display = "block";
  document.getElementById('homescreen_invite_no_event').style.display = "none";
  document.getElementById('homescreen_invite_button').addEventListener('click', () => {
    e.showInvite();
  });
});

/*

Notification

 */
if (EasyPWA.isNotificationSupported()) {
  document.getElementById('notifications_not_supported').style.display = "none";
  document.getElementById('notifications_supported').style.display = "";
}

function setPermission(permission) {
  document.getElementById('permission').innerHTML = permission;
}

window.addEventListener('load', function(e) {
  navigator.permissions.query({name: 'notifications'}).then(notificationPerm => {
    setPermission(notificationPerm.state);
    notificationPerm.onchange = () => {
      setPermission(notificationPerm.state);
    }
  });
});

window.addEventListener('easy-pwa-ready', function(e) {
  document.getElementById('bt_notification_permission').addEventListener('click', function () {
    EasyPWA.requestNotificationPermission();
  });

  document.getElementById('bt_notification_send').addEventListener('click', function () {
    new Notification('A notification', {
      icon: 'https://blogger.googleusercontent.com/img/a/AVvXsEgp_F9FCIwdquza9REYbm3LbypMjB51M6l2uwM419IZ0sxcNUV5hw0sZq9K-dJV6rRPm68vXHtCIx-N1d3bO0MRdLQ5ZfFQyiEHDRJ8aB--FeltWO4elgb63uC0L4oWEsLhumNSbws6W9p3mAlW_8-JcQEBYN3LLessrC4bQY3YVW2J-XzFZXtvXY7AVw',
      body: 'A description for your notification.',
    });
  });
});

/*
Other tools
 */

window.addEventListener('easy-pwa-page-changing', function(e) {
  alert('Page is changing. In standalone mode, you would like to show a loader for example.');
});
