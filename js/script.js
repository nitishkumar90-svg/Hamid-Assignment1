import { getTransmissions, getRecordsByTransmission } from './service.js'

const createElement = (tagName, classes) => {
    const newElem = document.createElement(tagName)
    classes.forEach(class1 => {
        newElem.className += class1 + ` `
    })
    return newElem
}

const createResult = (event) => {
    const classes = []
    classes.push(`box-shadow`)
    const divElement = createElement(`div`, classes)
    classes.clear()
    console.log(classes);
}

const getTransmitionTypes = () => {
    const url = 'https://who-covid-19-data.p.rapidapi.com/api/data/transmissionTypes'
    const resp = getTransmissions(url)
    console.log('resp', resp);
    if (resp.length > 0)
        resp.forEach(element => createResult(element))
}

const getRecordsByTransmissionId = (event) => {
    const url = 'https://who-covid-19-data.p.rapidapi.com/api/data?transmissionType=1&reportDate=2020-03-25'
    const resp = getRecordsByTransmission(url)
    
}

getTransmitionTypes()