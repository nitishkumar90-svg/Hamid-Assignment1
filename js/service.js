export const getTransmissions = (url) => {
    return getTranmissionTypes(url)
}

export const getRecordsByTransmission = (transmissionId) => {

}

const getTranmissionTypes = (url) => {
    const resp = []
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "daf35c45d6msha57c852baf4b504p1efceajsned7156504bd9",
            "x-rapidapi-host": "who-covid-19-data.p.rapidapi.com"
        }
    })
        .then(response => response.json()).then(response => {
            response.types.forEach(element => {
                resp.push(element)
            });
        }).catch(error => {
            console.log(error)
        })
        return resp
}