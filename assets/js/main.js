var all = {
    init: function () {
        this.todolist();
    },
    todolist: function () {

        pullData();
        // Add User
        const add_Plus = document.querySelector('.btn__img');

        // Load animation
        const load = document.querySelector('.loader ')

        // Btn-popup
        const ovelay = document.querySelector('.ovelay');
        const form = document.querySelector('.form__add-edit');
        const form__content = document.querySelector('.form__add__container');
        const cancel = document.querySelector('.cancel');
        const complete = document.querySelector('.complete');
        const edit = document.querySelectorAll('.edit')
       

        // Value
        const user = document.querySelector('#user');
        const email = document.querySelector('#email');
        const adress = document.querySelector('#adress')
        const input = document.querySelector('.input')
     
        
        var current;

        /** Show - Remove Popup */
        function showPopup(popup) {
            ovelay.classList.add('active')
            popup.classList.add('hien')

        }
        function removePopup(popup) {
            ovelay.classList.remove('active')
            popup.classList.remove('hien')

        }
        cancel.addEventListener('click', () => {
            removePopup(form)
            resetForm();
        })
        add_Plus.addEventListener('click', () => {
            current = 'add';
            showPopup(form)
        })
        /** validate */
        function validate() {
            if (user.value.length == 0 || email.value.length == 0 || adress.value.length == 0) {
                form__content.classList.add('validate')
                setTimeout(() => {
                    form__content.classList.remove('validate')
                }, 500)
                return false
            } else {
                return true;
            }
        }
        /** Click Edit */
        edit.forEach((item,index) => item.addEventListener('click',()=>{
            current = 'edit';
            showPopup(form)
            let data = JSON.parse(localStorage.getItem('local'));
            user.value = data[index].user;
            email.value = data[index].email;
            adress.value = data[index].adress;
            complete.addEventListener('click',()=>{
                validate()
                if (validate()) {
                    load.classList.add('loading')
                    setTimeout(() => {
                        load.classList.remove('loading')
                        if( current == 'edit'){
                            editData(index)
                        }
                    }, 1000)
                }
            })
        }))
        /** Click Add */
        complete.addEventListener('click', () => {
            validate()
            if (validate()) {
                load.classList.add('loading')
                setTimeout(() => {
                    load.classList.remove('loading')
                    if(current == 'add'){
                        add()  
                    }            
                }, 1000)
            }
        })
        /** GetData */
        function getData() {
            class getUser {
                constructor(id, user, email, adress) {
                    this.id = id;
                    this.user = user;
                    this.email = email;
                    this.adress = adress;
                }
            }
            let data = JSON.parse(localStorage.getItem('local'));
            if (data === null) {
                data = []
            }
            let save = new getUser(data.length + 1, user.value, email.value, adress.value);
            data.push(save)
            localStorage.setItem('local', JSON.stringify(data))
        }
        /** Reset Form */
        function resetForm() {
            user.value = '';
            email.value = '';
            adress.value = '';
        }
        /** Pull Data */
        function pullData() {
            let data = JSON.parse(localStorage.getItem('local'));
            if (data === null) return;
            document.querySelector('tbody').innerHTML = '';
            data.forEach((item, index) => {
                let tr = document.createElement('tr');
                let tbody = document.querySelector('.tbody');
                let contentMail = `
                        <td class="">${item.id}</td>
                        <td class="user__title">${item.user}</td>
                        <td class="">${item.email}</td>
                        <td class="">${item.adress}</td>
                        <td class="edit"><i class="fas fa-edit"></i></td>
                        <td class="trash"><i class="fas fa-trash-alt"></i></td>
                    `;
                tr.innerHTML = contentMail;
                tbody.appendChild(tr); 
            })
        }
        /** Search */
        input.addEventListener('keyup',()=>{
            searchData(input.value)
        })
        /** Adđ */
        function add() {
            getData();
            removePopup(form)
            resetForm();
            location.reload();
        }

        /** Delete */
        const popup__delete = document.querySelector('.popup__delete');
        const yes = document.querySelector('.yes');
        const no = document.querySelector('.no');
        const icon__delete = document.querySelectorAll('.trash');
    
        icon__delete.forEach((item, index) => {
            item.addEventListener('click', () => {
                showPopup(popup__delete)
                yes.addEventListener('click', () => {
                    load.classList.add('loading')
                    setTimeout(() => {
                        load.classList.remove('loading')
                        removeData(index)  
                        location.reload();
                        pullData();

                    }, 1000)
                        
                })
                no.addEventListener('click', () => {
                    removePopup(popup__delete)
                    location.reload();
                    pullData();
                })
            })
         
        })
     
        function removeData(index) {
            let data = JSON.parse(localStorage.getItem('local')); 
            data.splice(index, 1);
            data.forEach((item, index) => item.id = index + 1);
            localStorage.setItem('local', JSON.stringify(data)); 
            location.reload();
        }

        /** Edit */
        function editData(index){
            let data = JSON.parse(localStorage.getItem('local'));
            data[index].user = user.value;
            data[index].email = email.value;
            data[index].adress = adress.value
            localStorage.setItem('local', JSON.stringify(data));
            location.reload();
        }

        /** Search */
        function searchData(searchValue){
            let items = document.querySelectorAll('.tbody tr')
            items.forEach((item, index) => {
                let value = item.querySelector('.user__title').textContent;
                if (value.toUpperCase().includes(searchValue.toUpperCase())) {
                    items[index].style.display = '';
                }
                else {
                    items[index].style.display = 'none';
                }
            })
        }
    }
}
all.init()