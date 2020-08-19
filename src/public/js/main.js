const { timeago } = require("../../libs/handlebars");

const socket = io()

Notification.requestPermission();

function notifyMe(message = 'Hi there!') {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(message);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(message);
            }
        });
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}

socket.on('new message', data => {

    notifyMe('New message: ' + data.Body);
    console.log('New Message')
    const messagesList = document.getElementById('messages');

    const li = document.createElement('li');
    li.classList = 'list-group-item list-group-item-warning list-group-item-action';

    const body = document.createElement('p');
    body.appendChild(document.createTextNode(data.Body));

    const from = document.createElement('spam');
    from.appendChild(document.createTextNode(data.From));

    const _id = document.createElement('spam');
    _id.appendChild(document.createTextNode(data._id));

    const createdAt = document.createElement('spam');
    createdAt.appendChild(document.createTextNode(timeago.format(data.createdAt)));

    li.appendChild(body)
    li.appendChild(_id)
    li.appendChild(from)
    li.appendChild(createdAt)

    messagesList.prepend(li);
})