const loadPhone = async(searchText) =>{
const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
const res = await fetch(url);
const data = await res.json();
displayPhones(data.data)
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.innerText = '';
    const noPhoneFound = document.getElementById('no-found-phone')
    if(phones.length === 0){
        noPhoneFound.classList.remove('d-none')
    }
    else{
        noPhoneFound.classList.add('d-none')
    }
    phones = phones.slice(0, 12);
    phones.forEach(phone =>{
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML =`
        <div class="card p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.brand}</h5>
            <p class="card-text">${phone.phone_name}</p>
            <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis tenetur odit iste soluta enim dicta minus consequatur consectetur quaerat.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phonesDiv);
    })
    toggleSpinner(false);
}

const phoneSearch = () =>{
    toggleSpinner(true)
    const searchField = document.getElementById('phone-field')
    const searchText = searchField.value;
    searchField.value = ''
    loadPhone(searchText)
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

const loadPhoneDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitel = document.getElementById('phoneDetailsModalLabel');
    modalTitel.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'Release Date not Found'}</p>
    <p>Chip: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'Chip set not Found'}</p>
    <p>Display: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Phone Display is not Found'}</p>
    <p>WLAN: ${phone.others ? phone.others.WLAN : 'WLAN is not Available'}</p>

    `

}
loadPhone('oppo');