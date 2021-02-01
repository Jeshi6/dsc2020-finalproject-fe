let loadData = async() => {
    try {
        document.getElementById("main").style.visibility = "hidden"
        document.getElementById("loading").style.display = "block"
        let data = await fetch(`https://covid19.mathdro.id/api/countries/IDN`, {
            method: 'GET'
        })

        if (data.ok) {
            let mainData = await data.json()
			let amount = [mainData.confirmed.value, mainData.recovered.value, mainData.deaths.value]
            let totalAmount = document.createElement("p")
            let totalCategory = document.createElement("p")
            let totalAmountText = document.createTextNode(amount[0]+amount[1]+amount[2])
            let totalCategoryText = document.createTextNode("Total Case")

            totalAmount.classList.add("amount-total")
            totalCategory.classList.add("category-total")
            totalAmount.appendChild(totalAmountText)
            totalCategory.appendChild(totalCategoryText)

            document.getElementById("total-box").appendChild(totalAmount)
            document.getElementById("total-box").appendChild(totalCategory)

            let category = ["Positive", "Recovered", "Death"]
            
            for (let i = 0; i < category.length; i++) {
                let div = document.createElement("div")

                div.classList.add("box")
                let pAmount = document.createElement("p")
                pAmount.classList.add("amount")
                let pAmountText = document.createTextNode(amount[i]);
                pAmount.appendChild(pAmountText)
                let pCategory = document.createElement("p")
                pCategory.classList.add("category")
                let pCategoryText = document.createTextNode(category[i])
                pCategory.appendChild(pCategoryText)

                div.appendChild(pAmount)
                div.appendChild(pCategory)

                document.getElementById("desc-box").appendChild(div)
            }
            document.getElementById("main").style.visibility = "visible"
            document.getElementById("loading").style.display = "none"
        } else {
            console.log("Erorr " + data.status + " " + data.statusText);
        }

    } catch (err) {
        console.log(err)
    }
}

loadData()