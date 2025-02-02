document.addEventListener("DOMContentLoaded", function () {
    const addSkillButton = document.getElementById("addSkill");
    const skillsContainer = document.getElementById("skillsContainer");
    
    const addSoftwareButton = document.getElementById("addSoftware");
    const softwareContainer = document.getElementById("softwareContainer");
    
    const addLanguageButton = document.getElementById("addLanguage");
    const languagesContainer = document.getElementById("languagesContainer");
    
    const addExperienceButton = document.getElementById("addExperience");
    const experienceContainer = document.getElementById("experienceContainer");
    
    const addEducationButton = document.getElementById("addEducation");
    const educationContainer = document.getElementById("educationContainer");
    
    const addCertificationButton = document.getElementById("addCertification");
    const certificationsContainer = document.getElementById("certificationsContainer");
    
    const cvForm = document.getElementById("cvForm");
    const cvOutput = document.getElementById("cvOutput");
    const cvContent = document.getElementById("cvContent");

    // Función para agregar elementos a un contenedor
    function createInputGroup(placeholder) {
        const group = document.createElement("div");
        group.classList.add("form-group", "d-flex", "align-items-center");

        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("form-control", "mr-2");
        input.placeholder = placeholder;

        const select = document.createElement("select");
        select.classList.add("form-control", "mr-2");
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            select.appendChild(option);
        }

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.classList.add("btn", "btn-danger", "ml-2");
        removeButton.textContent = "Eliminar";
        removeButton.addEventListener("click", () => group.remove());

        group.appendChild(input);
        group.appendChild(select);
        group.appendChild(removeButton);

        return group;
    }

    addSkillButton.addEventListener("click", () => {
        const skillGroup = createInputGroup("Habilidad");
        skillsContainer.appendChild(skillGroup);
    });

    addSoftwareButton.addEventListener("click", () => {
        const softwareGroup = createInputGroup("Software");
        softwareContainer.appendChild(softwareGroup);
    });

    addLanguageButton.addEventListener("click", () => {
        const languageGroup = createInputGroup("Idioma");
        languagesContainer.appendChild(languageGroup);
    });

    function createExperienceOrEducationOrCertificationGroup(type) {
        const group = document.createElement("div");
        group.classList.add("form-group", "d-flex", "align-items-center");

        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("form-control", "mr-2");
        input.placeholder = type === "experiencia" ? "Empresa" : "Institución";

        const startDate = document.createElement("input");
        startDate.type = "date";
        startDate.classList.add("form-control", "mr-2");

        const endDate = document.createElement("input");
        endDate.type = "date";
        endDate.classList.add("form-control", "mr-2");

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.classList.add("btn", "btn-danger", "ml-2");
        removeButton.textContent = "Eliminar";
        removeButton.addEventListener("click", () => group.remove());

        group.appendChild(input);
        group.appendChild(startDate);
        group.appendChild(endDate);
        group.appendChild(removeButton);

        return group;
    }

    addExperienceButton.addEventListener("click", () => {
        const experienceGroup = createExperienceOrEducationOrCertificationGroup("experiencia");
        experienceContainer.appendChild(experienceGroup);
    });

    addEducationButton.addEventListener("click", () => {
        const educationGroup = createExperienceOrEducationOrCertificationGroup("educación");
        educationContainer.appendChild(educationGroup);
    });

    addCertificationButton.addEventListener("click", () => {
        const certificationGroup = createExperienceOrEducationOrCertificationGroup("certificación");
        certificationsContainer.appendChild(certificationGroup);
    });

    cvForm.addEventListener("submit", function (event) {
        event.preventDefault();
        generateCV();
    });

    function generateCV() {
        // Limpiar contenido previo
        while (cvContent.firstChild) {
            cvContent.firstChild.remove();
        }

        const name = document.getElementById("name").value;
        const title = document.getElementById("title").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const dob = document.getElementById("dob").value;
        const linkedin = document.getElementById("linkedin").value;

        const skills = [...skillsContainer.children].map(skillGroup => {
            return {
                name: skillGroup.children[0].value,
                level: skillGroup.children[1].value
            };
        });

        const software = [...softwareContainer.children].map(softwareGroup => {
            return {
                name: softwareGroup.children[0].value,
                level: softwareGroup.children[1].value
            };
        });

        const languages = [...languagesContainer.children].map(languageGroup => {
            return {
                name: languageGroup.children[0].value,
                level: languageGroup.children[1].value
            };
        });

        const experiences = [...experienceContainer.children].map(expGroup => {
            return {
                company: expGroup.children[0].value,
                startDate: expGroup.children[1].value,
                endDate: expGroup.children[2].value
            };
        });

        const educations = [...educationContainer.children].map(eduGroup => {
            return {
                institution: eduGroup.children[0].value,
                startDate: eduGroup.children[1].value,
                endDate: eduGroup.children[2].value
            };
        });

        const certifications = [...certificationsContainer.children].map(certGroup => {
            return {
                name: certGroup.children[0].value,
                startDate: certGroup.children[1].value,
                endDate: certGroup.children[2].value
            };
        });

        // Crear contenido del CV
        const nameElement = document.createElement("h4");
        nameElement.textContent = name;
        cvContent.appendChild(nameElement);

        const titleElement = document.createElement("p");
        titleElement.textContent = title;
        cvContent.appendChild(titleElement);

        const emailElement = document.createElement("p");
        emailElement.textContent = email;
        cvContent.appendChild(emailElement);

        const phoneElement = document.createElement("p");
        phoneElement.textContent = phone;
        cvContent.appendChild(phoneElement);

        const dobElement = document.createElement("p");
        dobElement.textContent = dob;
        cvContent.appendChild(dobElement);

        const linkedinElement = document.createElement("p");
        const linkedinLink = document.createElement("a");
        linkedinLink.href = linkedin;
        linkedinLink.target = "_blank";
        linkedinLink.textContent = "LinkedIn";
        linkedinElement.appendChild(linkedinLink);
        cvContent.appendChild(linkedinElement);

        function addSection(title, items) {
            if (items.length > 0) {
                const sectionTitle = document.createElement("h5");
                sectionTitle.textContent = title;
                cvContent.appendChild(sectionTitle);

                const ul = document.createElement("ul");
                items.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item.name || item.company || item.institution || item.certification;
                    ul.appendChild(li);
                });
                cvContent.appendChild(ul);
            }
        }

        addSection("Habilidades", skills);
        addSection("Software", software);
        addSection("Idiomas", languages);
        addSection("Experiencia Laboral", experiences);
        addSection("Educación", educations);
        addSection("Certificaciones", certifications);

        // Mostrar CV generado
        cvOutput.style.display = "block";

        
        // Limpiar el formulario
        cvForm.reset();

        // Función para limpiar un contenedor
    function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// Limpiar los contenedores
clearContainer(skillsContainer);
clearContainer(softwareContainer);
clearContainer(languagesContainer);
clearContainer(experienceContainer);
clearContainer(educationContainer);
clearContainer(certificationsContainer);

    }
});
