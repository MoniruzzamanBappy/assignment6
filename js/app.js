// onclick method declare
const searchPhone = () => {
    const inputField = document.getElementById('input-text').value;
    inputText = inputField.toLowerCase();
    if (inputText !== '') {
        getPhone(inputText);
    }
    else {
        alert("Please type a phone name");
    }
    document.getElementById('input-text').value = '';
}
// fetch api and get data
const getPhone = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}
// display the phones and show in ui
const displayPhone = items => {
    const container1 = document.getElementById('modal-show');
    container1.textContent = '';
    const container = document.getElementById('phones');
    container.textContent = '';

    if (items.length !== 0) {
        for (let i = 0; i < 20; i++) {
            const div = document.createElement('div')
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100">
                <img src="${items[i].image}" class="img-fluid p-2 card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${items[i].phone_name}</h5>
                    <p class="card-text">Brand: ${items[i].brand}</p>
                </div>
                <div class="card-footer">
                <a onclick="phoneDetails('${items[i].slug}')" class="btn d-grid btn-primary ms-auto btn-sm" href="#"
                role="button">See
                details</a>
                </div>
            </div>
        `;
            container.appendChild(div);
        }
    }
    else {
        const div = document.createElement('div');
        div.innerHTML = `
        <h1 class="text-danger">No Phone found</h1>
        `;
        container.appendChild(div);
    }
}
//  get phones by id 
const phoneDetails = id => {
    const url1 = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url1)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

// show phone details in ui
const displayDetails = info => {
    const container = document.getElementById('modal-show');
    container.textContent = '';
    const div = document.createElement('div')
    div.innerHTML = `
            <img class="img-fluid" src="${info.image}" alt="">
            <h2>Name: ${info.name}</h2>
            <hr>
            <p>Brand: ${info.brand}</p>
    `;
    container.appendChild(div);
    // validation and show data forrelease date
    validation(info.releaseDate, 'Release Date');
    // validation and show data display
    validation(info.mainFeatures.displaySize, 'Display');
    // validation and show data storage
    validation(info.mainFeatures.storage, 'Storage');
    // validation and show data memory
    validation(info.mainFeatures.memory, 'Memory');
    // validation and show data chipset
    validation(info.mainFeatures.chipSet, 'Chip Set');
    // validation and show data sensor
    validation(info.mainFeatures.sensors, 'Sensor');
    // validation and show data others info
    if (info.others !== undefined) {
        const div2 = document.createElement('div')
        div2.innerHTML = `
        <hr>
            <p>Others:</p>
        `;
        container.appendChild(div2);
        for (const [key, value] of Object.entries(info.others)) {
            const div1 = document.createElement('div')
            div1.innerHTML = `
            <p class="container ps-5">${key}: ${value}</p>
            `;
            container.appendChild(div1);
        }
    }
    else {
        const div1 = document.createElement('div')
        div1.innerHTML = `
            <hr>
            <p>Others: NOT SPECIFIED</p>
    `;
        container.appendChild(div1);
    }
}
const validation = (data, names) => {
    const container = document.getElementById('modal-show');
    if (data !== undefined && data !== '') {
        const div1 = document.createElement('div')
        div1.innerHTML = `
            <hr>
            <p>${names}: ${data}</p>
    `;
        container.appendChild(div1);
    }
    else {
        const div1 = document.createElement('div')
        div1.innerHTML = `
            <hr>
            <p>${names}: NOT SPECIFIED</p>
    `;
        container.appendChild(div1);
    }
}
