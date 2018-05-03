const Request = require('request');

exports.CTProvider = class CTProvider {

    constructor(url, username, password, version) {
        this.url = url
        this.username = username
        this.password = password
        this.version = version
    }

    getFuelStationPrices(city, fuelType) {
        return new Promise((completionHandler, errorHandler) => {
            const url = this.createPricesURL("variance", city, fuelType)
            console.log("request")
            console.log(url)
            Request.get(url, function(error, response, body) {
            
                var result = JSON.parse(body)
                var isOk = response.statusCode == 200
                
                console.log("result")
                console.log(result)
                 if(isOk) { completionHandler(result) } else { errorHandler(result, error) }

             })
        })
    }

    getTrafficIncidents(lat, lng) {
        return new Promise((completionHandler, errorHandler) => {
            var boundingBox = lat + "," + lng + "," + (lat - 0.22) + "," + (lng - 0.22)
            const url = "http://www.mapquestapi.com/traffic/v2/incidents?key=xR9kTOLyPwkIpkwR7Y6s2qUYcZkAdX9N&boundingBox=" + boundingBox + "&filters=construction,incidents";
            console.log("request traffic")
            console.log(url)
            Request.get(url, function (error, response, body) {

                var result = JSON.parse(body)
                var isOk = response.statusCode == 200

                console.log("result")
                console.log(result)
                if (isOk) { completionHandler(result) } else { errorHandler(result, error) }

            })
        })
    }

    getGeocodingInformation(city) {
        return new Promise((completionHandler, errorHandler) => {
            const url = "http://www.mapquestapi.com/geocoding/v1/address?key=xR9kTOLyPwkIpkwR7Y6s2qUYcZkAdX9N&location=" + city
            console.log("request traffic")
            console.log(url)
            Request.get(url, function (error, response, body) {

                var result = JSON.parse(body)
                var isOk = response.statusCode == 200

                console.log("result")
                console.log(result)
                if (isOk) { completionHandler(result) } else { errorHandler(result, error) }

            })
        })
    }

    createPricesURL(path, city, fuelType) {
        return this.url + "/prices/v" + this.version + "/" + path + "?user=" + this.username + "&pwd=" + this.password + "&city=" + city + "&fueltype=" + fuelType;
    }
}
