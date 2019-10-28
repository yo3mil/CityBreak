import * as model from './model';
import * as view from './view';
import * as base from './base';


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
            //console.log(state);
        } catch(error) {
            alert('something went wrong with the search !');
            console.log(error); 
        }
    }
};
const list =  async ()  => {
    
    // create a list
    state.list = [];
    
    for (let i = 0;  i < model.capitals.length; i++){
        state.list.push(new model.Search(model.capitals[i]));
    };
    
    for (let i = 0; i < state.list.length; i++) {
        try {
            await state.list[i].getResults();
            
        } catch {
            alert('something went wrong with the list!');
            console.log(error);
        }
        
    }
    // push current location to the list as well
    state.list.push(state.current);
    // sort objects
    model.sortObjects(state.list);
};


// get  current temp and array of capitals on load
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

    // make an array of capitals

    list();
    
});

////////////////////////////////////////////////////////////////////////////////
// List view CONTROLLER


const listViewRender = () => {
    // prepare UI for changes
    view.listView();
    view.clearFields(base.elements.listElement);
    // call function again after a dalay if results are not fetched yet
    if(state.list[(state.list.length - 1)].result) {
        base.clearLoader();
        listRenderLoop();
        
    } else {
        setTimeout(() => {
            listViewRender();
        },200);
    }
    
};
// render ready results into a list
const listRenderLoop = ()=> {
    for (let i = 0; i < state.list.length; i++) {
        view.renderList(state.list[i].result);
    };
}

base.elements.listIcon.addEventListener("click", e => {
    e.preventDefault();
    base.renderLoader(base.elements.listSection);
    listViewRender();
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
        onLoad();
    }
});

////////////////////////////////////////////////////////////////////////////////
// +/- CONTROLLER

/////////////
// + PLUS +
const addTemp = () => {
    // prepare UI for changes
    view.clearFields(base.elements.mainDisplay);
    base.renderLoader(base.elements.mainDisplay);

    //find next highest in the array
    for (let i = 0; i < state.list.length; i++) {
        if(state.list[i].result.main.temp > state.current.result.main.temp) {
            state.current = state.list[i];
            base.clearLoader();
            view.renderCurrent(state.current.result);
            
            break;
        }
    }
};
base.elements.plus.addEventListener("click", e => {
    
    if (state.current.result.name == state.list[(state.list.length - 1)].result.name) {
        alert(`Woah! ${state.current.result.name} is the warmest capital city in Europe right now!`);
        
    } else if (state.list.length > 30) {
        addTemp();
    }
});

/////////////
// - MINUS -
const subTemp = () => {
    // prepare UI for changes
    view.clearFields(base.elements.mainDisplay);
    base.renderLoader(base.elements.mainDisplay);
    
    // Find next lowest in the array (loop from the back )
    for (let i = (state.list.length - 1); i >= 0; i--) {
        if (state.list[i].result.main.temp < state.current.result.main.temp) {
            state.current = state.list[i];
            base.clearLoader();
            view.renderCurrent(state.current.result);
            
            break;
        }
    }
};
base.elements.minus.addEventListener("click", e => {
    if (state.current.result.name == state.list[0].result.name) {
        alert(`Woah! ${state.current.result.name} is the coldest capital city in Europe right now!`);
        
    } else if (state.list.length > 30) {
        subTemp();
    }
});