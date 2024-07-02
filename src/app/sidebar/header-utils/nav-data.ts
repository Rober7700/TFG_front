import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: '',
        icon: 'bi bi-1-circle',
        label: 'Ropa',
        items: [
            {
                routeLink: 'collection/ropa/tallaS',
                label: 'Talla XS-S'
            },
            {
                routeLink: 'collection/ropa/tallaM',
                label: 'Talla M'
            },
            {
                routeLink: 'collection/ropa/tallaL',
                label: 'Talla L-XL'
            },
        ]
    },
    {
        routeLink: 'collection/zapatos',
        icon: 'bi bi-2-circle',
        label: 'Zapatos'
    },
    {
        routeLink: '',
        icon: 'bi bi-3-circle',
        label: 'Accesorios',
        items: [
            {
                routeLink: 'collection/bolsos',
                label: 'Bolsos'
            },
            {
                routeLink: 'collection/cinturones',
                label: 'Cinturones'
            },
            {
                routeLink: 'collection/joyas',
                label: 'Joyas'
            },
        ]
    },
    {
        routeLink: '',
        icon: 'bi bi-4-circle',
        label: 'Sobre nosotros',
        items: [
        {
            routeLink: '',
            icon: 'bi bi-bookmarks',
            label: 'Marca'
        },
        {
            routeLink: '',
            icon: 'bi bi-bookmarks',
            label: 'Contacto'
        },
        {
            routeLink: '',
            icon: 'bi bi-bookmarks',
            label: 'Colaboraciones'
        },
        ]
    },
]

export const adminNavbarData: INavbarData[] = [
    {
        routeLink: '',
        icon: 'bi bi-bookmarks',
        label: 'Admin',
        items: [
            {
                routeLink: 'prendas',
                label: 'Inventario'
            },
            {
                routeLink: 'misPedidos',
                label: 'Pedidos'
            },
        ]
    },
]