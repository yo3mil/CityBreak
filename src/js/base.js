

export const elements = {
    mainDisplay: document.querySelector('.circle__data')
    
};
const elementStrings = {
    loader: 'lds-ripple'
};


// LOADER

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}"><div></div><div></div></div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) {
        loader.parentElement.removeChild(loader);
    }
};





