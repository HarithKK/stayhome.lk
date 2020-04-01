import { Asset } from 'expo-asset';

export default [
    {
        image: Asset.fromModule(require('./assets/cough.png')).uri,
        sinhalaText: 'ඔබට කැස්ස තිබේද ?',
        englishText: 'Do You Have Cough?',
        type: 'isCough'
    },
    {
        image: Asset.fromModule(require('./assets/cold.png')).uri,
        sinhalaText: 'ඔබට අසාමාන්‍ය සිසිලසක් දැනේද ?',
        englishText: 'Do You Have Colds?',
        type: 'isCold'
    },
    {
        image: Asset.fromModule(require('./assets/diarrhea.png')).uri,
        sinhalaText: 'ඔබට පාචනය ඇතිද ?',
        englishText: 'Are you having diarrhea?',
        type: 'isDiarrhea'
    },
    {
        image: Asset.fromModule(require('./assets/soreThroat.png')).uri,
        sinhalaText: 'ඔබට උගුර වණ වීම ඇතිද ?',
        englishText: 'Are you having sore throat?',
        type: 'isSoreThroat'
    },
    {
        image: Asset.fromModule(require('./assets/rash.png')).uri,
        sinhalaText: 'ඔබට ශරීරයේ වේදනාවක් දැනේද ?',
        englishText: 'Are you experiencing MYALGIA or body aches?',
        type: 'isRash'
    },
    {
        image: Asset.fromModule(require('./assets/headache.png')).uri,
        sinhalaText: 'ඔබට හිසරදය දැනේද ?',
        englishText: 'Are you having headache?',
        type: 'isHeadache'
    },
    {
        image: Asset.fromModule(require('./assets/breath.png')).uri,
        sinhalaText: 'ඔබට හුස්ම ගැනීමේ අපහසුතා දැනේද ?',
        englishText: 'Are you having breathing difficulties?',
        type: 'isBreath'
    },
    {
        image: Asset.fromModule(require('./assets/fatigue.png')).uri,
        sinhalaText: 'ඔබට තෙහෙට්ටුව දැනේද ?',
        englishText: 'Are you experiencing fatigue?',
        type: 'isFatigue'
    }
]