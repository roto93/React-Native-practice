
export const getTypeColor = (type) => {
    switch (type) {
        case 'normal':
            return {
                bgc: '#FFD1BF',
                tcolor: 'black'
            }
        case 'fighting':
            return {
                bgc: '#F06542',
                tcolor: '#fff'
            }
        case 'flying':
            return {
                bgc: '#BADEFC',
                tcolor: 'black'
            }
        case 'poison':
            return {
                bgc: '#A346AF',
                tcolor: '#fff'
            }
        case 'ground':
            return {
                bgc: '#885430',
                tcolor: '#fff'
            }
        case 'rock':
            return {
                bgc: '#bc948b',
                tcolor: 'black'
            }
        case 'bug':
            return {
                bgc: '#9EF877',
                tcolor: 'black'
            }
        case 'ghost':
            return {
                bgc: '#94618F',
                tcolor: 'black'
            }
        case 'steel':
            return {
                bgc: '#5A5955',
                tcolor: '#fff'
            }
        case 'fire':
            return {
                bgc: '#EF2406',
                tcolor: '#fff'
            }
        case 'water':
            return {
                bgc: '#246EB9',
                tcolor: '#fff'
            }
        case 'grass':
            return {
                bgc: '#386641',
                tcolor: '#fff'
            }
        case 'electric':
            return {
                bgc: '#F1E87E',
                tcolor: 'black'
            }
        case 'psychic':
            return {
                bgc: '#FFB7C3',
                tcolor: 'black'
            }
        case 'ice':
            return {
                bgc: '#D6EDFF',
                tcolor: 'black'
            }
        case 'dragon':
            return {
                bgc: '#124559',
                tcolor: '#fff'
            }
        case 'dark':
            return {
                bgc: '#1F1F1F',
                tcolor: '#fff'
            }
        case 'fairy':
            return {
                bgc: '#FFB6F2',
                tcolor: 'black'
            }
        case 'unknown':
            return {
                bgc: null,
                tcolor: 'black'
            }
        case 'shadow':
            return {
                bgc: null,
                tcolor: 'black'
            }
        default: return {
            bgc: null,
            tcolor: 'black'
        }
    }
}
