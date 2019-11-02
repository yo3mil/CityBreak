import * as model from './model';
import * as view from './view';
import * as base from './base';


//GLOBAL STATE OF THE APP
const state = {};

///////////////////////////////////////////////////////////////////
// ON LOAD CONTROLLER
let cords;

const onLoad = async () => {
    // prepare ui for changes
    view.clearFields(base.elements.mainDisplay);
    base.renderLoader(base.elements.mainDisplay);

    if(cords) {
        // new object added to the state
        state.current = new model.Search(cords);

        
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
            alert('something went wrong an element in the list!');
            console.log(error);
        }
    };
    // push current location to the list as well
    state.list.push(state.current);
    // sort objects
    model.sortObjects(state.list);
};


// ON LOAD listener
window.addEventListener("load", () => {

    // checks if location feature is allowed in the browser
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            cords = [position.coords.longitude, position.coords.latitude];
            
            onLoad();
            
            list();
        });
    } else {
        alert('Cant access the location');
    }


    
});

////////////////////////////////////////////////////////////////////////////////
// List view CONTROLLER


const listViewRender = () => {
    // prepare UI for changes
    view.listView();
    view.clearFields(base.elements.listElement);

    // call function again after a dalay if results are not fetched yet
    if(state.list[(model.capitals.length - 1)].result) {
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

const plusBtn = () => {
    view.clearFields(base.elements.mainDisplay);
    base.renderLoader(base.elements.mainDisplay);
    try {
        if (state.current.result.name === state.list[(state.list.length - 1)].result.name) {
            alert(`Woah! ${state.current.result.name} is the warmest capital city in Europe right now!`);
            base.clearLoader();
            view.renderCurrent(state.list[(state.list.length - 1)].result);
        } else if (state.list.length > 30) {
            addTemp();
        }
    } catch(error) {
        console.log(error);
        // if data hasnt loaded yet
        alert('Loading, please try again.');
        base.clearLoader();
        view.renderCurrent(state.current.result);
    }
};

const addTemp = () => {
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

base.elements.plus.addEventListener("click", plusBtn);

/////////////
// - MINUS -

const minusBtn = () => {
    view.clearFields(base.elements.mainDisplay);
    base.renderLoader(base.elements.mainDisplay);
    try {
        if (state.current.result.name === state.list[0].result.name) {
            alert(`Woah! ${state.current.result.name} is the coldest capital city in Europe right now!`);
            base.clearLoader();
            view.renderCurrent(state.list[0].result);
        } else if (state.list.length > 30) {
            subTemp();
        }
    } catch(error) {
        console.log(error);
        alert('Loading, please try again.');
        base.clearLoader();
        view.renderCurrent(state.current.result);
    }
};

const subTemp = () => {
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
base.elements.minus.addEventListener("click", minusBtn);