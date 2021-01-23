let provinces = {};

let loadProvinces = async() => {
    document.getElementById('loading').style.display = "block"
    document.getElementById('main').style.visibility = "hidden"
    try {
        let data = await fetch(`https://indonesia-covid-19.mathdro.id/api/provinsi`, {
            method: 'GET'
        })

        if (data.ok) {
            provinces = await data.json()
            setProvinces(provinces.data)

        } else {
            console.log("Error " + data.status + " " + data.statusText)
        }

    } catch (err) {
        console.log(err)
    }

}

document.getElementById('input-search').addEventListener('keyup', (event) => {
    const query = event.target.value.toLowerCase();

    const dataFiltered = provinces.data.filter((p) => {
        return p.provinsi.toLowerCase().includes(query)
    })

    setProvinces(dataFiltered)
})

function setProvinces(data) {
    document.getElementById('desc-box').innerHTML = ''
    data.forEach((province, index) => {
        if (province.provinsi != "Indonesia") {
            let divProvinceItem = document.createElement('div')
            divProvinceItem.classList.add("province-item")
                // Title
            let divTitleProvince = document.createElement('div')
            divTitleProvince.classList.add("title-province")

            let pNumber = document.createElement('p')
            pNumber.classList.add("title-number")
            let pName = document.createElement('p')
            pName.classList.add('title-name')

            let pNumberText = document.createTextNode("#" + (index + 1))
            let pNameText = document.createTextNode(province.provinsi)

            pNumber.appendChild(pNumberText)
            pName.appendChild(pNameText)
            divTitleProvince.appendChild(pNumber)
            divTitleProvince.appendChild(pName)
                // Detail
            let divProvinceDetail = document.createElement('div')
            divProvinceDetail.classList.add('province-detail')

            let arrAmount = [province.kasusPosi, province.kasusSemb, province.kasusMeni]
            let arrCategory = ["Positive", "Recovered", "Death"]

            for (let i = 0; i < arrAmount.length; i++) {
                let div = document.createElement('div')
                div.classList.add("province-subdetail")

                let pLeft = document.createElement('p')
                let pRight = document.createElement('p')

                pLeft.classList.add('subdetail-left')
                pRight.classList.add('subdetail-right')

                let pLeftText = document.createTextNode(arrAmount[i])
                let pRightText = document.createTextNode(arrCategory[i])

                pLeft.appendChild(pLeftText)
                pRight.appendChild(pRightText)

                div.appendChild(pLeft)
                div.appendChild(pRight)

                divProvinceDetail.appendChild(div)
                if (i != arrAmount.length - 1) {
                    let separator = document.createElement('hr')
                    divProvinceDetail.appendChild(separator)
                }
            }
            divProvinceItem.appendChild(divTitleProvince)
            divProvinceItem.appendChild(divProvinceDetail)
            document.getElementById('desc-box').appendChild(divProvinceItem)
            document.getElementById('loading').style.display = "none"
            document.getElementById('main').style.visibility = "visible"
        }
    });
}

loadProvinces()