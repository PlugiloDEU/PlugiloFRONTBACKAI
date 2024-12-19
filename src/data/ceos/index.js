import christianKlein from './christian-klein.json' assert { type: "json" };
import sanjayBrahmawar from './sanjay-brahmawar.json' assert { type: "json" };
import oliverSteil from './oliver-steil.json' assert { type: "json" };
import yvesPadrines from './yves-padrines.json' assert { type: "json" };
import michaelMohr from './michael-mohr.json' assert { type: "json" };
import timCook from './tim-cook.json' assert { type: "json" };
import satyaNadella from './satya-nadella.json' assert { type: "json" };
import billGates from './bill-gates.json' assert { type: "json" };
import markZuckerberg from './mark-zuckerberg.json' assert { type: "json" };
import sundarPichai from './sundar-pichai.json' assert { type: "json" };
import jensenHuang from './jensen-huang.json' assert { type: "json" };
import andyJassy from './andy-jassy.json' assert { type: "json" };
import donaldTrump from './donald-trump.json' assert { type: "json" };
import elonMusk from './elon-musk.json' assert { type: "json" };
// Export map of CEOs by name
export const ceos = {
    'Christian Klein': christianKlein,
    'Sanjay Brahmawar': sanjayBrahmawar,
    'Oliver Steil': oliverSteil,
    'Yves Padrines': yvesPadrines,
    'Michael Mohr': michaelMohr,
    'Tim Cook': timCook,
    'Satya Nadella': satyaNadella,
    'Bill Gates': billGates,
    'Mark Zuckerberg': markZuckerberg,
    'Sundar Pichai': sundarPichai,
    'Jensen Huang': jensenHuang,
    'Andy Jassy': andyJassy,
    'Donald J. Trump': donaldTrump,
    'Elon Musk': elonMusk
};
// Export function to get CEO info
export const getCEOInfo = (name) => {
    return ceos[name];
};
