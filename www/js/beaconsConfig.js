var createBeaconRegion = function () {
    var uuid = cordova.plugins.locationManager.BeaconRegion.WILDCARD_UUID; //wildcard
    var identifier = 'SomeIdentifier';
    var major = undefined;
    var minor = undefined;

    var beaconRegion = new cordova
        .plugins
        .locationManager
        .BeaconRegion(identifier, uuid, major, minor);

    return beaconRegion
}

var logToDom = function (message) {
    var e = document.createElement('label');
    e.innerText = message;

    var br = document.createElement('br');
    var br2 = document.createElement('br');

    var results = document.getElementById("results")
    results.appendChild(e);
    results.appendChild(br);
    results.appendChild(br2);
    window.scrollTo(0, window.document.height);

};

var getName = function (uuid) {
    switch (true) {
            case uuid
                .toUpperCase()
                .includes('CBF53FBE'):
            return "beetroot"
        case uuid
                .toUpperCase()
                .includes('98D127CF'):
            return "lemon"
        case uuid
                .toUpperCase()
                .includes('ADEFCF'):
            return "coconut"
        case uuid
                .toUpperCase()
                .includes('BBBE733'):
            return "candy"
        default:
            return "?"
    }
}

var toString = function (beacon) {
    return ('Color: <span class="dot ' + getName(beacon.uuid) + '"></span> (' + getName(beacon.uuid) + ') <br> UUID: ' + beacon.uuid + '<br> major: ' + beacon.major + '<br> minor: ' + beacon.minor + '<br> TX: ' + beacon.tx + '<br> Proximity: ' + beacon.proximity + '<br> rssi: ' + beacon.rssi + '<br> Accuracy: ' + beacon.accuracy)
}

var rangeShow = function (beacons) {
    var results = document.getElementById("results")
    beacons.forEach(beacon => {
        var name = getName(beacon.uuid)
        var div = document.getElementById(name)
        if (div) {
            div.innerHTML = toString(beacon)
        } else {
            div = document.createElement('div')
            div.id = getName(beacon.uuid)
            div.innerHTML = toString(beacon)
            results.appendChild(div)
            results.appendChild(document.createElement('hr'))
        }
    });
}

var delegateAction = function () {
    var delegate = new cordova
        .plugins
        .locationManager
        .Delegate();

    delegate.didDetermineStateForRegion = function (pluginResult) {

        logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

        cordova
            .plugins
            .locationManager
            .appendToDeviceLog('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
    };

    delegate.didStartMonitoringForRegion = function (pluginResult) {
        console.log('didStartMonitoringForRegion:', pluginResult);

        logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
    };

    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        rangeShow(pluginResult.beacons);
    };

    cordova
        .plugins
        .locationManager
        .setDelegate(delegate);
    return delegate
}