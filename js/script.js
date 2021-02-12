//#region variables
let backButton = document.getElementById(`backButton`),
    txtSearch = document.getElementById(`text_search`),
    searchIcon = document.getElementById(`search_icon`),
    result = document.getElementById(`result`),
    mainHeading = document.getElementById(`mainHeading`),
    data = {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "daf35c45d6msha57c852baf4b504p1efceajsned7156504bd9",
            "x-rapidapi-host": "who-covid-19-data.p.rapidapi.com"
        }
    },
    mainUrl = `https://who-covid-19-data.p.rapidapi.com/api/data`

//#endregion

//#region Event Handlers

// ONLY when the interface is loaded, do we go and look for data and render
window.addEventListener(`load`, (event) => {

    //#region Methods
    let createElement = (tagName, classes) => {
        let newElem = document.createElement(tagName)
        classes.forEach(class1 => {
            newElem.className += class1 + ` `
        })
        return newElem
    }

    let createTransmissionResult = ({ number, name, desc }) => {
        let classes = []
        classes.push(`box-shadow`)
        let divElement = createElement(`div`, classes)

        //need to add anchor tag inside div
        classes.splice(0, classes.length)
        let aTag = createElement(`a`, classes)
        aTag.setAttribute(`href`, `javascript:void(0)`)
        aTag.setAttribute(`id`, number)
        aTag.addEventListener(`click`, () => {
            getRecordsByTransmissionId(number, name)
        })

        //need to add h4 tag inside anchor tag
        classes.splice(0, classes.length)
        classes.push(`sub-heading`)
        let h1Tag = createElement(`h4`, classes)
        h1Tag.innerText = name
        aTag.appendChild(h1Tag)

        //need to add p tag inside anchor tag
        classes.splice(0, classes.length)
        let pTag = createElement(`p`, classes)
        pTag.innerText = desc
        aTag.appendChild(pTag)
        divElement.appendChild(aTag)

        result.appendChild(divElement)

    }


    let createFinalResult = ({ name, cases, newCases, deaths, newDeaths }) => {
        let classes = []
        classes.push(`box-shadow`)
        let divElement = createElement(`div`, classes)

        classes.splice(0, classes.length)
        classes.push(`sub-heading`)
        let h1Tag = createElement(`h4`, classes)
        h1Tag.innerText = name
        divElement.appendChild(h1Tag)

        classes.splice(0, classes.length)
        let pTag = createElement(`p`, classes)
        pTag.innerHTML = `<b>Cases</b>: ${cases}`
        divElement.appendChild(pTag)

        classes.splice(0, classes.length)
        pTag = createElement(`p`, classes)
        pTag.innerHTML = `<b>New Cases</b>: ${newCases}`
        divElement.appendChild(pTag)

        classes.splice(0, classes.length)
        pTag = createElement(`p`, classes)
        pTag.innerHTML = `<b>Deaths</b>: ${deaths}`
        divElement.appendChild(pTag)

        classes.splice(0, classes.length)
        pTag = createElement(`p`, classes)
        pTag.innerHTML = `<b>New Deaths</b>: ${newDeaths}`
        divElement.appendChild(pTag)

        result.appendChild(divElement)

    }



    let getTransmitionTypes = () => {
        backButton.classList.add(`hidden`)
        txtSearch.classList.remove(`hidden`)
        searchIcon.classList.remove(`hidden`)
        result.innerHTML = `<p>Please wait...</p>`
        mainHeading.innerHTML = `Covid-19 Transmission Types`
        let url = `${mainUrl}/transmissionTypes`

        fetch(url, data)
            .then(response => response.json()).then(response => {
                result.innerHTML = ``
                return response.types.map(createTransmissionResult)
            }).catch(error => {
                console.log(error)
            })

    }

    let getRecordsByTransmissionId = (transmissionId, transmissionName) => {
        txtSearch.classList.add(`hidden`)
        searchIcon.classList.add(`hidden`)
        backButton.classList.remove(`hidden`)
        mainHeading.innerHTML = transmissionName
        result.innerHTML = `<p>Please wait...</p>`
        let url = ``
        if (transmissionId !== 0)
            url = `${mainUrl}?transmissionType=${transmissionId}&reportDate=2020-03-25`
        else
            url = `${mainUrl}?reportDate=2020-03-25`
        fetch(url, data)
            .then(response => response.json()).then(response => {
                result.innerHTML = ``
                return response.map(createFinalResult)
            }).catch(error => {
                console.log(error)
            })
    }

    //#endregion
    backButton.addEventListener(`click`, getTransmitionTypes)
    getTransmitionTypes()
})

//#endregion