import * as model from './model';
import * as view from './view';
import * as base from './base';
// app controler 

//GLOBAL STATE OF THE APP
const state = {};

///////////////////////////////////////////////////////////////////
// ON LOAD CONTROLLER
let cords;
const onLoad = async () => {

    if(cords) {
        // new object added to the state
        state.current = new model.Current(cords);

        // prepare ui for changes
        view.clearFields();
        base.renderLoader(base.elements.mainDisplay);


        try {
            // call method to get data in nested object
            await state.current.getResults();
            // render the results
            base.clearLoader();

            view.renderCurrent(state.current.result);
            
        } catch(error) {
            alert('something went wrong with search !');
            console.log(error); 
        }
    }
}
// get temp on load
window.addEventListener("load", () => {

    // checks if location feature is allowed in the browser
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            cords = [position.coords.longitude, position.coords.latitude];
            
            onLoad();
            
        });
    } else {
        alert('Cant access location');
    }
    
});

// numArray.sort((a, b) => a - b); // For ascending sort
// numArray.sort((a, b) => b - a); // For descending sort

const arr = [2, 1, 3, 5, 4];
console.log(arr);

const ascARR = arr.sort((a, b) => a - b);
console.log(ascARR);

const desARR = arr.sort((a, b) => b - a);
console.log(desARR);