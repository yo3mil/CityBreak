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
        view.clearFields(base.elements.mainDisplay);
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
const list =  async ()  => {
    // prepare UI for changes
    view.listView();
    view.clearFields(base.elements.listElement);

    // render list
    state.list = [];
    
    for (var i = 0;  i < model.capitals.length; i++){
        state.list.push(new model.Search(model.capitals[i]));
    };
    
    for (var i = 0; i < state.list.length; i++) {
        try {
            await state.list[i].getResults();
        } catch {
            alert('something went wrong with the list!');
            console.log(error);
        }
        view.renderList(state.list[i].result);
    }
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

//////////////////////////////////////////////////////////////////////////////////
// home btn

base.elements.body.addEventListener("click", e => {
    if(e.target.matches('#home')) {
        view.homeView();
    }
});
