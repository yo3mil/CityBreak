

export const elements = {
    mainDisplay: document.querySelector('.circle__data'),
    listIcon: document.querySelector('.listBtn'),
    infoIcon: document.querySelector('.infoBtn'),
    title: document.querySelector('.header'),
    mainSection: document.querySelector('.landing'),
    listSection: document.querySelector('.list'),
    infoSection: document.querySelector('.info'),
    listElement: document.querySelector('.list__all'),
    body: document.querySelector('.body'),
    plus: document.querySelector('.icon-plus'),
    minus: document.querySelector('.icon-minus')
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




