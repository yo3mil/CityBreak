import { elements } from './base';

export const clearFields = () => {
    elements.mainDisplay.innerHTML = '';
};

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

const calculateTemp = temp => {
    const celcius = Math.round(temp - 273.15);
    return celcius;
};