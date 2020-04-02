import { Asset } from 'expo-asset';

export default [
    {
        image: Asset.fromModule(require('./assets/cough.png')).uri,
        type: 'isCough'
    },
    {
        image: Asset.fromModule(require('./assets/cold.png')).uri,
        type: 'isCold'
    },
    {
        image: Asset.fromModule(require('./assets/diarrhea.png')).uri,
        type: 'isDiarrhea'
    },
    {
        image: Asset.fromModule(require('./assets/soreThroat.png')).uri,
        type: 'isSoreThroat'
    },
    {
        image: Asset.fromModule(require('./assets/rash.png')).uri,
        type: 'isRash'
    },
    {
        image: Asset.fromModule(require('./assets/headache.png')).uri,
        type: 'isHeadache'
    },
    {
        image: Asset.fromModule(require('./assets/headache.png')).uri,
        type: 'isFever'
    },
    {
        image: Asset.fromModule(require('./assets/breath.png')).uri,
        type: 'isBreath'
    },
    {
        image: Asset.fromModule(require('./assets/fatigue.png')).uri,
        type: 'isFatigue'
    }
]