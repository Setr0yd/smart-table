import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules); 

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        Object.values(indexes[elementName]).map((name) => {
            const options = document.createAttribute("option");
            options.value = name;
            options.textContent = name;
            return options
            elements[elementName].append(...options)
        })
        
    }) 
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.dataset.name === "clear") {
            const parent = action.parentElement;
            const input = parent.querySelector("input");
            input.value = "";
            const field = action.dataset.field;
            state[field] = '';
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state)); 
    }
}