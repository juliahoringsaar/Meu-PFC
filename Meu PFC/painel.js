document.addEventListener("DOMContentLoaded", () => {
    // 1. Alternância e Deslize da Sidebar
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const openSidebarBtn = document.getElementById("open-sidebar-btn");

    sidebarToggle.addEventListener("change", () => {
        if (!sidebarToggle.checked) {
            sidebar.classList.add("collapsed");
            document.body.classList.add("sidebar-collapsed");
            openSidebarBtn.classList.add("visible");
        }
    });

    openSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("collapsed");
        document.body.classList.remove("sidebar-collapsed");
        openSidebarBtn.classList.remove("visible");
        sidebarToggle.checked = true;
    });

    // 2. Dropdowns do Histórico
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");
    dropdownBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const subMenu = btn.nextElementSibling;
            subMenu.classList.toggle("open");
        });
    });

    // 3. Controle dos Modais
    const modalButtons = document.querySelectorAll(".btn-modal");
    const closeButtons = document.querySelectorAll(".close-modal");
    const overlays = document.querySelectorAll(".modal-overlay");

    modalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const targetModal = document.getElementById(targetId);
            if (targetModal) targetModal.classList.add("active");
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".modal-overlay").classList.remove("active");
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) overlay.classList.remove("active");
        });
    });

    // 4. Barra de Pesquisa Expansível
    const searchBtn = document.getElementById("search-btn");
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("search-input");

    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        searchContainer.classList.toggle("active");
        if (searchContainer.classList.contains("active")) {
            searchInput.focus();
        }
    });

    // 5. Seleção de Avatares no Perfil
    const avatarOptions = document.querySelectorAll(".avatar-option");
    avatarOptions.forEach(option => {
        option.addEventListener("click", () => {
            avatarOptions.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
        });
    });
});