function eventListeners() {
    const ui = new UI()

    window.addEventListener('load', function () {
        ui.hidePreloader();
    })

    document.querySelector('.navBtn').addEventListener('click', function () {
        ui.showNav();
    })
    // control the Video
    document.querySelector('.video__switch').addEventListener('click', function () {
        ui.videoControls();
    })
    // Submit the form
    document.querySelector('.drink__form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.querySelector('.input__name').value;
        const lastname = document.querySelector('.input__lastname').value;
        const email = document.querySelector('.input__email').value;

        let value = ui.checkEmpty(name, lastname, email)

        if (value) {
            let customer = new Customer(name, lastname, email);
            console.log(customer);
            ui.addCustomer(customer)
            ui.showFeedback('Customer added to the list', 'success')
            ui.clearFields()

        } else {
            ui.showFeedback('Bitte alle Felder ausfüllen!', 'error')
        }
    })

    // display Modal
    const links = document.querySelectorAll('.work__item-icon');
    links.forEach(function (item) {
        item.addEventListener('click', function (event) {
            ui.showModal(event);
        })
    })

    // hide Modal
    document.querySelector('.work__modal-close').addEventListener('click', function () {
        ui.closeModal();
    })


}
eventListeners()



function UI() {

}

UI.prototype.hidePreloader = function () {
    document.querySelector('.preloader').style.display = "none";
}

UI.prototype.showNav = function () {
    document.querySelector('.nav').classList.toggle('nav__show')
}

UI.prototype.videoControls = function () {
    let btn = document.querySelector('.video__switch-btn')
    if (!btn.classList.contains('btnSlide')) {
        btn.classList.add('btnSlide');
        document.querySelector('.video__item').pause()
    } else {
        btn.classList.remove('btnSlide');
        document.querySelector('.video__item').play()
    }
}

UI.prototype.checkEmpty = function (name, lastname, email) {
    let result;
    if (name === '' || lastname === '' || email === '') {

        result = false;
    } else {
        result = true
    }
    return result;
}

UI.prototype.showFeedback = function (text, type) {
    const feedback = document.querySelector('.drink__form-feedback');
    if (type === 'success') {
        feedback.classList.add('success');
        feedback.innerHTML = text;
        this.removeAlert('success')

    } else if (type === 'error') {
        feedback.classList.add('error');
        feedback.innerHTML = text;
        this.removeAlert('error')
    }
}

UI.prototype.removeAlert = function (type) {
    setTimeout(function () {
        document.querySelector('.drink__form-feedback').classList.remove(type)
    }, 3000)
}


// add Customer
UI.prototype.addCustomer = function (customer) {
    const images = [1, 2, 3, 4, 5];
    let random = Math.floor(Math.random() * images.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<img src="img/person-${random}.jpeg" alt="person1" class="person__thumbnail">
                        <h4 class="person__name">${customer.name}</h4>
                        <h4 class="person__lastname">${customer.lastname}</h4>`
    document.querySelector('.drink__card-list').appendChild(div)
}

// clear Field
UI.prototype.clearFields = function () {
    document.querySelector('.input__name').value = '';
    document.querySelector('.input__lastname').value = '';
    document.querySelector('.input__email').value = '';
}

// show Modal
UI.prototype.showModal = function (event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains('work__item-icon')) {
        let id = event.target.parentElement.dataset.id

        const modal = document.querySelector('.work__modal');
        const modalItem = document.querySelector('.work__modal-item');

        modal.classList.add('work__modal-show');
        modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`
    }
}

// hide Modal
UI.prototype.closeModal = function () {
    document.querySelector('.work__modal').classList.remove('work__modal-show');
}


function Customer(name, lastname, email) {
    this.name = name
    this.lastname = lastname
    this.email = email
}