export default {
  anatomy: {
    subjectName: 'Anatomija',
    subjectImage: require('../assets/subjectImages/anatomy.png'),
    cardColor: '#F16A7D', // Color of the card in the ModelHub
    backgroundColor: '#E9B3BB', // Background color of the icon in the ModelHub
    themeColor: '#F16A7D', // Header and button color in ModelScreen and SubjectScreen
    bgColor: null, // Background color of the icon in ModelScreen and SubjectScreen
    subjectId: 'anatomy',
    modelNames: ['srce', 'bubreg', 'jetra', 'pluća'],
    modelImages: [
      require('../assets/modelImages/anatomy/heart.png'),
      require('../assets/modelImages/anatomy/kidney.png'),
      require('../assets/modelImages/anatomy/liver.ong'),
      require('../assets/modelImages/anatomy/lungs.png'),
    ]
  },
  astronomy: {
    subjectName: 'Astronomija',
    subjectImage: require('../assets/subjectImages/astronomy.png'),
    cardColor: '#6C7FD8',
    themeColor: '#A5AFDE',
    themeColor: '#6C7FD8',
    bgColor: null,
    subjectId: 'astronomy',
    modelNames: ['Zemlja', 'Mars', 'Mjesec', 'Sputnjik 1'],
    modelImages: [
      require('../assets/modelImages/astronomy/earth.png'),
      require('../assets/modelImages/astronomy/mars.png'),
      require('../assets/modelImages/astronomy/moon.png'),
      require('../assets/modelImages/astronomy/sputnik1.png'),
    ]
  },
  botany: {
    subjectName: 'Botanika',
    subjectImage: require('../assets/subjectImages/botany.png'),
    cardColor: '#86B24B',
    themeColor: '#C1D2AA',
    themeColor: '#86B24B',
    bgColor: null,
    subjectId: 'botany',
    modelNames: ['Anturijum', 'Dimak', 'Paprat', 'Tratinčica'],
    modelImages: [
      require('../assets/modelImages/botany/anturijum.png'),
      require('../assets/modelImages/botany/dimak.png'),
      require('../assets/modelImages/botany/paprat.png'),
      require('../assets/modelImages/botany/tratincica.png'),
    ]
  },
  chemistry: {
    subjectName: 'Hemija',
    subjectImage: require('../assets/subjectImages/chemistry.png'),
    cardColor: '#FF7EB8',
    themeColor: '#F0BAD2',
    themeColor: '#FF7EB8',
    bgColor: 'white',
    subjectId: 'chemistry',
    modelNames: ['ugljen-dioksid', 'glukoza', 'mliječna\nkiselina', 'voda'],
    modelImages: [
      require('../assets/modelImages/chemistry/carbon_dioxide.png'),
      require('../assets/modelImages/chemistry/glucosa.png'),
      require('../assets/modelImages/chemistry/milk_acid.png'),
      require('../assets/modelImages/chemistry/water.png'),
    ]
  },
  electronics: {
    subjectName: 'Elektronika',
    subjectImage: require('../assets/subjectImages/electronics.png'),
    cardColor: '#FCC136',
    themeColor: '#EFD69C',
    themeColor: '#FCC136',
    bgColor: null,
    subjectId: 'electronics',
    modelNames: ['matična\nploča', 'procesor', 'RAM', 'tranzistor'],
    modelImages: [
      require('../assets/modelImages/electronics/motherboard.png'),
      require('../assets/modelImages/electronics/processor.png'),
      require('../assets/modelImages/electronics/ram.png'),
      require('../assets/modelImages/electronics/transistor.png'),
    ]
  },
  microbiology: {
    subjectName: 'Mikrobiologija',
    subjectImage: require('../assets/subjectImages/microbiology.png'),
    cardColor: '#EAD359',
    themeColor: '#E6E1C4',
    themeColor: '#EAD359',
    bgColor: '#F0DCF3',
    subjectId: 'microbiology',
    modelNames: ['ćelija', 'Covid-19', 'hepatitis', 'koža'],
    modelImages: [
      require('../assets/modelImages/microbiology/cell.png'),
      require('../assets/modelImages/microbiology/corona.png'),
      require('../assets/modelImages/microbiology/hepatitis.png'),
      require('../assets/modelImages/microbiology/skin.png'),
    ]
  },
  mycology: {
    subjectName: 'Mikologija',
    subjectImage: require('../assets/subjectImages/mycology.png'),
    cardColor: '#D77F4A',
    themeColor: '#DFBAA4',
    themeColor: '#D77F4A',
    bgColor: 'white',
    subjectId: 'mycology',
    modelNames: ['Brazovded', 'Muhara', 'Šitake', 'Sunčanica'],
    modelImages: [
      require('../assets/modelImages/mycology/brazovded.png'),
      require('../assets/modelImages/mycology/muhara.png'),
      require('../assets/modelImages/mycology/sitake.png'),
      require('../assets/modelImages/mycology/suncanica.png'),
    ]
  },
  zoology: {
    subjectName: 'Zoologija',
    subjectImage: require('../assets/subjectImages/zoology.png'),
    cardColor: '#603F42',
    themeColor: '#A49495',
    themeColor: '#603F42',
    bgColor: null,
    subjectId: 'zoology',
    modelNames: ['komarac', 'kornjača', 'lav', 'paun', 'pčela', 'puž'],
    modelImages: [      
      require('../assets/modelImages/zoology/bee.png'),
      require('../assets/modelImages/zoology/mosquito.png'),
      require('../assets/modelImages/zoology/lion.png'),
      require('../assets/modelImages/zoology/peacock.png'),
      require('../assets/modelImages/zoology/turtle.png'),
      require('../assets/modelImages/zoology/snail.png'),
    ]
  },
};

