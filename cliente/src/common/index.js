const backendDomain = 'http://localhost:3001';

export const authApi = {
    register: {
        url: `${backendDomain}/api/auth/register`,
        method: 'post'
    },
    login: {
        url: `${backendDomain}/api/auth/login`,
        method: 'post'
    }
}

export const userApi = {
    getAllUsers: {
        url: `${backendDomain}/api/user`,
        method: 'get'
    },
    getUser: {
        url: `${backendDomain}/api/user`,
        method: 'get'
    }
}

export const categoryApi = {
    getAllCategories: {
        url: `${backendDomain}/api/category`,
        method: 'get'
    },
    createCategory: {
        url: `${backendDomain}/api/category`,
        method: 'post'
    }
}

export const materialApi = {
    getAllMateriales: {
        url: `${backendDomain}/api/material`,
        method: 'get'
    },
    createMaterial: {
        url: `${backendDomain}/api/material`,
        method: 'post'
    }
}

export const productApi = {
    getAllProducts: {
        url: `${backendDomain}/api/product`,
        method: 'get'
    },
    createProduct: {
        url: `${backendDomain}/api/product`,
        method: 'post'
    },
    modifyProduct: {
        url: `${backendDomain}/api/product`,
        method: 'put'
    },
    getAllProductsByCategory: {
        url: `${backendDomain}/api/product`,
        method: 'get'
    }
}

export const facturaApi = {
    getAllFacturasByUser: {
        url: `${backendDomain}/api/factura`,
        method: 'get'
    },
    getAllFacturas: {
        url: `${backendDomain}/api/factura`,
        method: 'get'
    },
    registerFactura: {
        url: `${backendDomain}/api/factura`,
        method: 'post'
    }
}