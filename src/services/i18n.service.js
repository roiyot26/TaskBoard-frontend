import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: false,
        resources: {
            en: {
                translation: {
                    taskBoard: "Task Management Board",
                    addTask: "Add Task",
                    delete: "DELETE",
                    deleteLow: "Delete",
                    edit: "EDIT",
                    back: "Back",
                    createdAt: "Created At",
                    filterByTitle: "Filter by Title",
                    priority: "Priority",
                    taskPerPage: "Tasks per Page",
                    sortBy: "Sort by",
                    ascending: "Ascending",
                    clearFilters: "Clear Filters",
                    backToTasks: "Back to Tasks",
                    updateTask: "Update Task",
                    title: "Title",
                    high: "High",
                    medium: "Medium",
                    low: "Low",
                    all:"all",
                    description: "Description",
                    task:"Task",
                    editLow:"Edit"
                }
            },
            es: {
                translation: {
                    taskBoard: "Tablero de tareas",
                    addTask: "Agregar Tarea",
                    delete: "BORRAR",
                    deleteLow: "Borrar",
                    edit: "EDITAR",
                    back: "Atrás",
                    createdAt: "Creado en",
                    filterByTitle: "Filtrar por título",
                    priority: "Prioridad",
                    taskPerPage: "Tareas por página",
                    sortBy: "Ordenar por",
                    ascending: "Ascendente",
                    clearFilters: "Borrar filtros",
                    backToTasks: "Volver a tareas",
                    updateTask: "Actualizar Tarea",
                    title: "Título",
                    high: "Alta",
                    medium: "Media",
                    low: "Baja",
                    all:"Todo",
                    description: "Descripción",
                    task:"Tarea",
                    editLow: "Editar",


                }
            }
            ,
        },
        lng: 'en', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already does escaping
        },
    })

export default i18n
