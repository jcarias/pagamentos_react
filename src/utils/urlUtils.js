export const urls = {
    home: { name: "Home", path: "/" },
    services: { name: "Serviços", path: "/services", toolbar: true },
    addService: { name: "Novo Serviço", path: "/services/add", toolbar: true },
    updateService: {
        name: "Editar Serviço",
        path: "/services/update/:id",
        toolbar: true
    },
    about: { name: "Sobre", path: "/about", toolbar: true },
    payments: { name: "Pagamentos", path: "/payments", toolbar: true },
    addPayment: {
        name: "Criar Novo Pagamento",
        path: "/payments/add",
        toolbar: true
    },
    updatePayment: {
        name: "Editar Pagamento",
        path: "/payments/upadte/:id",
        toolbar: true
    },
    workers: {
        name: "Trabalhadores",
        path: "/workers",
        toolbar: true
    },
    addWorker: {
        name: "Criar Novo Trabalhador",
        path: "/workers/add",
        toolbar: true
    },
    updateWorker: {
        name: "Editar Trabalhador",
        path: "/workers/update/:id",
        toolbar: true
    }
};

export const urlsToolbar = () => {
    let retVal = [];

    Object.keys(urls).map(key => {
        let url = urls[key];
        return retVal.push({ name: url.name, path: url.path });
    });

    return retVal;
};
