const https = require("https");

var icingaapi = function (url, port, user, pass) {
    this.url = url;
    this.port = port;
    this.user = user;
    this.pass = pass;
}; //construct

icingaapi.prototype.getServices = function (callback) {
    var self = this;

    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/services',
        method: 'GET',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
    }

    var req = https.request(options, (res) => {
        res.on('data', (d) => {
            if (res.statusCode == "200") {
                return callback(null, "" + d);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }

        });
    });
    req.end();

    req.on('error', (e) => {
        return callback(e, null);
    });
}
icingaapi.prototype.getHosts = function (callback) {
    var self = this;

    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/Hosts',
        method: 'GET',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
    }

    var req = https.request(options, (res) => {
        res.on('data', (d) => {
            if (res.statusCode == "200") {
                return callback(null, "" + d);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }

        });
    });
    req.end();

    req.on('error', (e) => {
        return callback(e, null);
    });
}

icingaapi.prototype.getHostFiltered = function (filter, callback) {
    var self = this;

    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/hosts/',
        method: 'POST',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicatoin/json"
        }
    }
    var req = https.request(options, (res) => {
        res.on('data', (d) => {
            if (res.statusCode == "200") {
                var output = JSON.parse(d);
                return callback(null, output.results);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }
        });
    });
    req.end(JSON.stringify(filter));

    req.on('error', (e) => {
        return callback(e, null);
    });
}

icingaapi.prototype.getService = function (ServerName, ServiceName, callback) {
    var self = this;
    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/services/' + ServerName + "!" + ServiceName,
        method: 'GET',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
    }

    var req = https.request(options, (res) => {
        res.on('data', (d) => {
            if (res.statusCode == "200") {
                return callback(null, "" + d);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }

        });
    });
    req.end();

    req.on('error', (e) => {
        return callback(e, null);
    });
}
icingaapi.prototype.getHost = function (ServerName, callback) {
    var self = this;
    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/hosts/' + ServerName,
        method: 'GET',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
    }

    var req = https.request(options, (res) => {
        res.on('data', (d) => {
            if (res.statusCode == "200") {
                return callback(null, "" + d);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }

        });
    });
    req.end();

    req.on('error', (e) => {
        return callback(e, null);
    });
}
icingaapi.prototype.getServiceWithState = function (state, callback) {
    var self = this;

    var body = JSON.stringify({
        "filter": "service.state == state",
        "filter_vars": {
            "state": state
        }
    });
    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/services',
        method: 'POST',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicatoin/json"
        }
    }
    var req = https.request(options, (res) => {
        res.on('data', (d) => {
            if (res.statusCode == "200") {
                var output = JSON.parse(d);
                return callback(null, output.results);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }
        });
    });
    req.end(body);

    req.on('error', (e) => {
        return callback(e, null);
    });
}
icingaapi.prototype.createHost = function (template, host, displayname, gruppe, onServer, callback) {
    var self = this;

    var hostObj = JSON.stringify({
        "templates": [template],
        "attrs": {
            "display_name": displayname,
            "vars.group": gruppe,
            "vars.server": onServer
        }
    })
    
    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/hosts/' + host,
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicatoin/json"
        }
    };
    var req = https.request(options, (res) => {
        res.on('data', (successMesage) => {
            if (res.statusCode == "200") {
                return callback(null, "" + successMesage);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }
        });
    });
    req.end(hostObj);

    req.on('error', (e) => {
        return callback(e, null);
    });
}
icingaapi.prototype.createService = function (template, host, service, displayname, gruppe, onServer, callback) {
    var self = this;

    var serviceObj = JSON.stringify({
        "templates": [template],
        "attrs": {
            "display_name": displayname,
            "vars.group": gruppe,
            "vars.server": onServer
        }
    })
    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/services/' + host + "!" + service,
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicatoin/json"
        }
    };
    var req = https.request(options, (res) => {
        res.on('data', (successMesage) => {
            if (res.statusCode == "200") {
                return callback(null, "" + successMesage);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }
        });
    });
    req.end(serviceObj);

    req.on('error', (e) => {
        return callback(e, null);
    });
}
icingaapi.prototype.createServiceCustom = function (serviceObj, host, service, callback) {
    var self = this;

    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/services/' + host + "!" + service,
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicatoin/json"
        }
    };
    var req = https.request(options, (res) => {
        res.on('data', (successMesage) => {
            if (res.statusCode == "200") {
                return callback(null, "" + successMesage);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }
        });
    });
    req.end(serviceObj);

    req.on('error', (e) => {
        return callback(e, null);
    });
}
icingaapi.prototype.createHostCustom = function (hostObj, host, callback) {
    var self = this;

    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/hosts/' + host,
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicatoin/json"
        }
    };
    var req = https.request(options, (res) => {
        res.on('data', (statusMessage) => {
            if (res.statusCode == "200") {
                return callback(null, "" + statusMessage);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }
        });
    });
    req.end(hostObj);

    req.on('error', (e) => {
        return callback(e, null);
    });
}
icingaapi.prototype.deleteHost = function (host, callback) {
    var self = this;
    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/hosts/' + host + "?cascade=1",
        method: 'DELETE',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicatoin/json"
        }
    }

    var req = https.request(options, (res) => {
        res.on('data', (d) => {
            if (res.statusCode == "200") {
                return callback(null, "" + d);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }

        });
    });
    req.end();

    req.on('error', (e) => {
        return callback(e, null);
    });
}
icingaapi.prototype.deleteService = function (service, host, callback) {
    var self = this;
    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/services/' + host + "!" + service + "?cascade=1",
        method: 'DELETE',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicatoin/json"
        }
    }

    var req = https.request(options, (res) => {
        res.on('data', (stateMessage) => {
            if (res.statusCode == "200") {
                return callback(null, "" + stateMessage);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }

        });
    });
    req.end();

    req.on('error', (e) => {
        return callback(e, null);
    });
}
icingaapi.prototype.setHostState = function (host, hostState, StateMessage, callback) {
    var self = this;
    
    var state = ({
        "exit_status": hostState,
        "plugin_output": StateMessage
    });

    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/actions/process-check-result?host=' + host,
        method: 'POST',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicatoin/json"
        }
    }
    var req = https.request(options, (res) => {
        res.on('data', (stateMessage) => {
            if (res.statusCode == "200") {
                return callback(null, "" + stateMessage);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }
        });
    });
    req.end(JSON.stringify(state));

    req.on('error', (e) => {
        return callback(e, null);
    });
}

icingaapi.prototype.setServiceState = function (service, host, serviceState, callback) {
    var self = this;

    var state = ({
        "exit_status": serviceState,
    });
    if (serviceState == 0) {
        state.plugin_output = "OK - Everything is going to be fine"
    }
    if (serviceState == 1) {
        state.plugin_output = "WARNING";
    }
    if (serviceState == 2) {
        state.plugin_output = "ERROR";
    }
    if (serviceState == 3) {
        state.plugin_output = "UNKNOWN";
    }

    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/actions/process-check-result?service=' + host + "!" + service,
        method: 'POST',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicatoin/json"
        }
    }
    var req = https.request(options, (res) => {
        res.on('data', (stateMessage) => {
            if (res.statusCode == "200") {
                return callback(null, "" + stateMessage);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }
        });
    });
    req.end(JSON.stringify(state));

    req.on('error', (e) => {
        return callback(e, null);
    });
}

icingaapi.prototype.getHostState = function(hostName, callback) {
    var self = this;

    var options = {
        hostname: self.url,
        port: self.port,
        path: '/v1/objects/hosts/' + hostName + '?attrs=state',
        method: 'GET',
        rejectUnauthorized: false,
        auth: self.user + ":" + self.pass,
    }

    var req = https.request(options, (res) => {
        res.on('data', (d) => {
            console.log(""+d);
            if (res.statusCode == "200") {
                var rs = d.toString();
                var result = JSON.parse(rs).results;
                var output = {
                    "state": result[0].attrs.state,
                    "name": result[0].name
                }
                return callback(null, output);
            } else {
                return callback({
                    "Statuscode": res.statusCode,
                    "StatusMessage": res.statusMessage
                }, null);
            }

        });
    });
    req.end();

    req.on('error', (e) => {
        return callback(e, null);
    });
}
module.exports = icingaapi;