

export class Search {
    constructor(cords) {
        this.cords = cords;
    }
    
    async getResults() {
        try {
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${this.cords[1]}&lon=${this.cords[0]}&APPID=1b14cf364521340ececa5ed3a758bd5a`;
            
            await fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                
                this.result = data;
                //console.log(this.result);
            });
            
        } catch(error) {
            console.log(error);
        }
    }
};

// CAPITALS LIST

export const capitals = ['Tirana', 'Vienna', 'Minsk', 'Brussels', 'Sarajevo', 'Sofia', 'Sofia', 'Zagreb', 'Nicosia', 'Prague', 'Copenhagen', 'Tallinn', 'Helsinki', 'Paris', 'Berlin', 'Athens', 'Budapest', 'Reykjavik', 'Dublin', 'Rome', 'Pristina', 'Riga', 'Vilnius', 'Skopje', 'Valletta', 'Amsterdam', 'Oslo', 'Warsaw', 'Lisbon', 'Bucharest', 'Belgrade', 'Moscow', 'Bratislava', 'Ljubliana', 'Madrit', 'Stockholm', 'Bern', 'Kiev', 'London']







// const renderTemp = data => {
//     let convert = data.main.temp - 273.15;
//     const markup = `
//         <p>${convert}</p>
//     `;

//     elements.temp.insertAdjacentHTML('afterbegin', markup);
// }