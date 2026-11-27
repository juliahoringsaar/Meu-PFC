
document.addEventListener("DOMContentLoaded", () => {

    const DEMO_USER = {
        id: null,
        name: "Seu nome",
        role: "professor", // Altere para aluno ou professor
        avatar: "👤"
    };

    const demoItems = [
        {
            id: 1,
            title: "Campeonato Regional",
            description: "Uma competição para apresentar projetos de robótica e incentivar a criatividade dos estudantes.",
            type: "evento",
            status: "proximo",
            image: ""
        },
        {
            id: 2,
            title: "Workshop Arduino",
            description: "Uma atividade prática para conhecer a plataforma Arduino e explorar suas possibilidades.",
            type: "evento",
            status: "encerrado",
            image: ""
        },
        {
            id: 3,
            title: "Braço Robótico V2",
            description: "Desenvolvimento de um braço robótico com melhorias de precisão e movimentação.",
            type: "projeto",
            status: "andamento",
            image: ""
        },
        {
            id: 4,
            title: "Seguidor de Linha",
            description: "Projeto de robótica voltado à construção de um robô capaz de percorrer trajetos.",
            type: "projeto",
            status: "concluido",
            image: ""
        }
    ];


    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const openSidebarBtn = document.getElementById("open-sidebar-btn");

    const projectsNav = document.getElementById("projects-nav");
    const contentPage = document.getElementById("content-page");
    const pageTitle = document.getElementById("page-title");

    const cardsGrid = document.getElementById("cards-grid");
    const emptyMessage = document.getElementById("empty-message");

    const searchContainer = document.getElementById("search-container");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    const filterButtons = document.querySelectorAll(".filter-btn");

    let currentSection = "evento";
    let currentFilter = "todos";


    document.getElementById("sidebar-user-name").textContent =
        DEMO_USER.name;

    document.getElementById("sidebar-avatar").textContent =
        DEMO_USER.avatar;

    const isTeacher = DEMO_USER.role === "professor";

    document.querySelectorAll(".teacher-only").forEach(element => {
        element.hidden = !isTeacher;
    });

    document.querySelectorAll(".student-only").forEach(element => {
        element.hidden = isTeacher;
    });


    function closeSidebar() {

        sidebar.classList.add("collapsed");
        document.body.classList.add("sidebar-collapsed");

        openSidebarBtn.classList.add("visible");
        sidebarToggle.checked = false;

    }

    function openSidebar() {

        sidebar.classList.remove("collapsed");
        document.body.classList.remove("sidebar-collapsed");

        openSidebarBtn.classList.remove("visible");
        sidebarToggle.checked = true;

    }

    sidebarToggle.addEventListener("change", () => {

        if (sidebarToggle.checked) {
            openSidebar();
        } else {
            closeSidebar();
        }

    });

    openSidebarBtn.addEventListener("click", openSidebar);


    document.querySelectorAll(".dropdown-btn").forEach(button => {

        button.addEventListener("click", () => {

            const subMenu = button.nextElementSibling;
            const isOpen = subMenu.classList.toggle("open");

            button.setAttribute("aria-expanded", isOpen);

        });

    });


    function updateFilterOptions() {

        if (currentSection === "projeto") {

            filterButtons[0].textContent = "Todos";
            filterButtons[0].dataset.filter = "todos";

            filterButtons[1].textContent = "Em andamento";
            filterButtons[1].dataset.filter = "andamento";

            filterButtons[2].textContent = "Concluídos";
            filterButtons[2].dataset.filter = "concluido";

        } else {

            filterButtons[0].textContent = "Todos";
            filterButtons[0].dataset.filter = "todos";

            filterButtons[1].textContent = "Próximos";
            filterButtons[1].dataset.filter = "proximo";

            filterButtons[2].textContent = "Encerrados";
            filterButtons[2].dataset.filter = "encerrado";

        }

        currentFilter = "todos";

        filterButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.filter === "todos"
            );
        });

    }


function showContent(section) {

    currentSection = section;

    contentPage.hidden = false;

    pageTitle.textContent =
        section === "projeto" ? "PROJETOS" : "EVENTOS";

    projectsNav.textContent =
        section === "projeto" ? "EVENTOS" : "PROJETOS";

    projectsNav.classList.remove("active");

    updateFilterOptions();
    renderCards();

}

projectsNav.addEventListener("click", () => {

    const nextSection =
        currentSection === "evento" ? "projeto" : "evento";

    showContent(nextSection);

});

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            currentFilter = button.dataset.filter;

            filterButtons.forEach(filter => {
                filter.classList.remove("active");
            });

            button.classList.add("active");

            renderCards();

        });

    });


    function createCard(item) {

        const card = document.createElement("article");
        card.className = "project-card";
        card.tabIndex = 0;

        const imageArea = document.createElement("div");
        imageArea.className = "project-card-image";

        if (item.image) {

            const image = document.createElement("img");

            image.src = item.image;
            image.alt = "Imagem de " + item.title;

            imageArea.appendChild(image);

        } else {

            imageArea.textContent = "▧";

        }

        const info = document.createElement("div");
        info.className = "project-card-info";

        const type = document.createElement("span");
        type.className = "project-card-type";

        type.textContent =
            item.type === "projeto" ? "PROJETO" : "EVENTO";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const description = document.createElement("p");
        description.textContent = item.description;

        info.append(type, title, description);
        card.append(imageArea, info);

        card.addEventListener("click", () => {

            alert(
                "A página de detalhes de " +
                item.title +
                " será desenvolvida em uma próxima etapa."
            );

        });

        card.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                card.click();

            }

        });

        return card;

    }


    function renderCards() {

        cardsGrid.replaceChildren();

        const searchTerm = searchInput.value
            .trim()
            .toLocaleLowerCase("pt-BR");

        const filteredItems = demoItems.filter(item => {

            const matchesSection =
                item.type === currentSection;

            const matchesStatus =
                currentFilter === "todos" ||
                item.status === currentFilter;

            const matchesSearch =
                item.title.toLocaleLowerCase("pt-BR").includes(searchTerm) ||
                item.description.toLocaleLowerCase("pt-BR").includes(searchTerm);

            return (
                matchesSection &&
                matchesStatus &&
                matchesSearch
            );

        });

        filteredItems.forEach(item => {

            cardsGrid.appendChild(createCard(item));

        });

        emptyMessage.hidden = filteredItems.length > 0;

    }


    searchBtn.addEventListener("click", () => {

        const isActive =
            searchContainer.classList.toggle("active");

        if (isActive) {

            searchInput.focus();

        } else {

            searchInput.value = "";
            renderCards();

        }

    });

    searchInput.addEventListener("input", renderCards);

    searchInput.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            searchInput.value = "";
            searchContainer.classList.remove("active");

            renderCards();

        }

    });


    document.querySelectorAll(".btn-modal").forEach(button => {

        button.addEventListener("click", () => {

            const targetId = button.dataset.target;
            const modal = document.getElementById(targetId);

            if (!modal) return;

            if (
                targetId === "modal-cadastro-item" &&
                button.dataset.itemType
            ) {

                const itemType = button.dataset.itemType;

                const modalTitle =
                    document.getElementById("modal-item-title");

                const titleInput =
                    document.getElementById("item-title");

                if (itemType === "proposta") {

                    modalTitle.textContent = "PROPOR PROJETO";

                } else if (itemType === "evento") {

                    modalTitle.textContent = "NOVO EVENTO";

                } else {

                    modalTitle.textContent = "NOVO PROJETO";

                }

                titleInput.value = "";

                document.getElementById("item-description").value = "";
                document.getElementById("item-feedback").textContent = "";

            }

            modal.classList.add("active");

        });

    });


    function closeModal(modal) {

        modal.classList.remove("active");

    }

    document.querySelectorAll(".close-modal").forEach(button => {

        button.addEventListener("click", () => {

            const modal = button.closest(".modal-overlay");

            if (modal) {
                closeModal(modal);
            }

        });

    });

    document.querySelectorAll(".modal-overlay").forEach(overlay => {

        overlay.addEventListener("click", event => {

            if (event.target === overlay) {
                closeModal(overlay);
            }

        });

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            document.querySelectorAll(".modal-overlay.active")
                .forEach(closeModal);

        }

    });


    const itemForm = document.getElementById("item-form");

    itemForm.addEventListener("submit", event => {

        event.preventDefault();

        const feedback =
            document.getElementById("item-feedback");

        feedback.textContent =
            "Formulário preparado! A publicação será conectada ao backend na integração com o banco.";

    });


    const avatarOptions =
        document.querySelectorAll(".avatar-option");

    avatarOptions.forEach(option => {

        option.addEventListener("click", () => {

            avatarOptions.forEach(item => {
                item.classList.remove("selected");
            });

            option.classList.add("selected");

            DEMO_USER.avatar = option.textContent;

            document.getElementById("sidebar-avatar").textContent =
                DEMO_USER.avatar;

        });

    });


    const profileForm =
        document.getElementById("profile-form");

    profileForm.addEventListener("submit", event => {

        event.preventDefault();

        const newName =
            document.getElementById("profile-name").value.trim();

        const feedback =
            document.getElementById("profile-feedback");

        if (!newName) return;

        DEMO_USER.name = newName;

        document.getElementById("sidebar-user-name").textContent =
            newName;

        feedback.textContent =
            "Alteração visual realizada. O salvamento definitivo depende do backend.";

    });


    document.getElementById("logout-btn").addEventListener("click", () => {

        alert("A saída da conta será conectada ao sistema de autenticação.");

    });

    document.getElementById("delete-account-btn").addEventListener("click", () => {

        alert("A exclusão de conta deverá ser implementada com confirmação e validação pelo backend.");

    });


    const activitiesButton =
        document.getElementById("my-activities-btn");

    activitiesButton.addEventListener("click", () => {

        alert("A área de acompanhamento das propostas e inscrições será desenvolvida em uma próxima etapa.");

    });


    document.querySelectorAll(".history-link").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            alert(
                "Os detalhes de " +
                link.textContent +
                " serão carregados futuramente."
            );

        });

    });

    showContent("evento");

});
