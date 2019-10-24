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
        state.current = new model.Search(cords);

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
            alert('something went wrong with the search !');
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
            // function call 
            onLoad();
        });
    } else {
        alert('Cant access the location');
    }
});

////////////////////////////////////////////////////////////////////////////////
// List view CONTROLLER
const list =  () => {
    // prepare UI for changes
    view.listView();
    //render list
};
base.elements.listIcon.addEventListener("click", e => {
    e.preventDefault();
    list();
});
////////////////////////////////////////////////////////////////////////////////
// info view CONTROLLER
base.elements.infoIcon.addEventListener("click", e => {
    e.preventDefault();
    view.infoView();
});


