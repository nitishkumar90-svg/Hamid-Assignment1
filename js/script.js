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
            "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
        }
    },
    mainUrl = `https://covid-19-statistics.p.rapidapi.com`

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

    let createTransmissionResult = ({ iso, name }) => {
        let classes = []
        classes.push(`box-shadow`)
        let divElement = createElement(`div`, classes)

        //need to add anchor tag inside div
        classes.splice(0, classes.length)
        let aTag = createElement(`a`, classes)
        aTag.setAttribute(`href`, `javascript:void(0)`)
        aTag.setAttribute(`id`, iso)
        aTag.addEventListener(`click`, () => {
            getRecordsByTransmissionId(iso)
        })

        //need to add h4 tag inside anchor tag
        classes.splice(0, classes.length)
        classes.push(`sub-heading`)
        let h1Tag = createElement(`h4`, classes)
        h1Tag.innerText = name
        aTag.appendChild(h1Tag)
        divElement.appendChild(aTag)

        result.appendChild(divElement)

    }


    let createFinalResult = ({ date, confirmed, confirmed_diff, deaths, recoverd, active }) => {
        let classes = []
        classes.push(`box-shadow`)
        let divElement = createElement(`div`, classes)

        classes.splice(0, classes.length)
        classes.push(`sub-heading`)
        let h1Tag = createElement(`h4`, classes)
        h1Tag.innerText = date
        divElement.appendChild(h1Tag)

        classes.splice(0, classes.length)
        let pTag = createElement(`p`, classes)
        pTag.innerHTML = `<b>Cases</b>: ${confirmed}`
        divElement.appendChild(pTag)

        classes.splice(0, classes.length)
        pTag = createElement(`p`, classes)
        pTag.innerHTML = `<b>New Cases</b>: ${confirmed_diff}`
        divElement.appendChild(pTag)

        classes.splice(0, classes.length)
        pTag = createElement(`p`, classes)
        pTag.innerHTML = `<b>Deaths</b>: ${deaths}`
        divElement.appendChild(pTag)

        classes.splice(0, classes.length)
        pTag = createElement(`p`, classes)
        pTag.innerHTML = `<b>Recovered</b>: ${recoverd}`
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

        fetch(`${mainUrl}/regions`, data).then(response => response.json()).then(response => {
            result.innerHTML = ``
            if (response.data.length === 0)
                result.innerHTML = `<p>No Data Found</p>`
            return response.data.map(createTransmissionResult)
        }).catch(error => {
            console.log(error)
        })

    }

    let getRecordsByTransmissionId = (iso) => {
        txtSearch.classList.add(`hidden`)
        searchIcon.classList.add(`hidden`)
        backButton.classList.remove(`hidden`)
        mainHeading.innerHTML = iso
        result.innerHTML = `<p>Please wait...</p>`
        let url = ``
        fetch(`${mainUrl}/reports/total?date=2020-04-07`, data)
            .then(response => response.json()).then(response => {
                result.innerHTML = ``
                if (response.data === undefined)
                    result.innerHTML = `<p>No Data Found</p>`
                return createFinalResult(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    //#endregion
    backButton.addEventListener(`click`, getTransmitionTypes)
    getTransmitionTypes()
})

//#endregion