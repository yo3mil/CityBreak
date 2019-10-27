import { elements } from './base';

// change results to celcius
const calculateTemp = temp => {
    const celcius = Math.round(temp - 273.15);
    return celcius;
};

// clears main display
export const clearFields = (element) => {
    element.innerHTML = '';
};
// render current temp on load
export const renderCurrent = (result) => {
    const html = `
        <div class="circle__data-header">
        Current:
        </div>
        <div class="circle__data-temp">
        ${calculateTemp(result.main.temp)}°C
        </div>
        <div class="circle__data-location">
        ${result.name}, ${result.sys.country}
        </div>
    `;
    elements.mainDisplay.insertAdjacentHTML('beforeend', html);
};

// transform ui to list view
export const listView  = () => {
    // minify title
    elements.title.classList.add("list-style");
    // remove section/ add section
    elements.mainSection.style.display = "none";
    elements.listSection.style.setProperty('display', 'flex');
};


// tranform UI to info view
export const infoView  = () => {
    // remove and add
    elements.mainSection.style.display = "none";
    elements.infoSection.style.setProperty('display', 'flex');
};

// home button click
export const homeView  = () => {
    elements.mainSection.style.setProperty('display', 'flex');      
    elements.infoSection.style.display = "none";
    elements.listSection.style.display = "none";
    elements.title.classList.remove("list-style");
};

export const renderList = (result) => {
    const html = `
        <li class="list__item">
            <div class="list__item-temp">${calculateTemp(result.main.temp)}°C</div>
            <div class="list__item-location"><a href="#"></a>${result.name}, ${result.sys.country}</div>
        </li>
    `;
    elements.listElement.insertAdjacentHTML('beforeend', html);
};