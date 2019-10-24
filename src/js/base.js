

export const elements = {
    mainDisplay: document.querySelector('.circle__data'),
    listIcon: document.querySelector('.listBtn'),
    infoIcon: document.querySelector('.infoBtn'),
    title: document.querySelector('.header'),
    mainSection: document.querySelector('.landing'),
    listSection: document.querySelector('.list'),
    infoSection: document.querySelector('.info')
    
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

// numArray.sort((a, b) => a - b); // For ascending sort
// numArray.sort((a, b) => b - a); // For descending sort

// const arr = [2, 1, 3, 5, 4];
// console.log(arr);

// const ascARR = arr.sort((a, b) => a - b);
// console.log(ascARR);

// const desARR = arr.sort((a, b) => b - a);
// console.log(desARR);



