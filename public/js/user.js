// user.js

import baseFetch from './shared/fetch.js';

const form = document.querySelector("form");

function createUser(data) {
    return baseFetch("/api/user", "POST", data);
}

function submitForm(e) {
    e.preventDefault();
    let form = e.target;
    let formData = {};

    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];

        if (element.tagName === "INPUT") {
            formData[element.name] = element.value;
        }
    }

    createUser(formData).then(async (response) => {
        if (response.ok) {
            alert("Usuário criado com sucesso!");
            form.reset(); // Limpa o formulário após criar o usuário
        } else {
            try {
                const obj = await response.json();
                if (obj.error) {
                    alert("Erro ao criar usuário: " + obj.error);
                } else {
                    alert("Erro ao criar usuário.");
                }
            } catch (error) {
                console.error('Erro na solicitação:', error);
                alert("Erro na solicitação. Por favor, tente novamente mais tarde.");
            }
        }
    }).catch(error => {
        console.error('Erro na solicitação:', error);
        alert("Erro na solicitação. Por favor, tente novamente mais tarde.");
    });
}

window.addEventListener("load", () => {
    form.addEventListener("submit", submitForm);
});
