export default {
  // Theres some redundancy, but it is there to make programming more managable
  // TODO: maybe fix image sizes, my bad, should probably be 512px
  // add the right colors for each subject (is bgColor is null then the icon should be full size)
  anathomy: {
    subjectName: 'Anatomija',
    subjectImage: require('../assets/subjectImages/anathomy.png'),
    cardColor: '#fff', // Color of the card in the ModelHub
    cardBgColor: '#fff', // Background color of the icon in the ModelHub
    themeColor: '#F16A7D', // Header and button color in ModelScreen and SubjectScreen
    bgColor: null, // Background color of the icon in ModelScreen and SubjectScreen
    subjectId: 'anathomy',
  },
  astronomy: {
    subjectName: 'Astronomija',
    subjectImage: require('../assets/subjectImages/astronomy.png'),
    cardColor: '#fff',
    cardBgColor: '#fff',
    themeColor: '#5C6CFF',
    bgColor: null,
    subjectId: 'astronomy',
  },
  botany: {
    subjectName: 'Botanika',
    subjectImage: require('../assets/subjectImages/botany.png'),
    cardColor: '#fff',
    cardBgColor: '#fff',
    themeColor: '#86B24B',
    bgColor: null,
    subjectId: 'botany',
  },
  electronics: {
    subjectName: 'Elektronika',
    subjectImage: require('../assets/subjectImages/electronics.png'),
    cardColor: '#fff',
    cardBgColor: '#fff',
    themeColor: '#FE9738',
    bgColor: null,
    subjectId: 'electronics',
  },
  chemistry: {
    subjectName: 'Hemija',
    subjectImage: require('../assets/subjectImages/chemistry.png'),
    cardColor: '#fff',
    cardBgColor: '#fff',
    themeColor: '#FF7EB8',
    bgColor: 'white',
    subjectId: 'chemistry',
  },
  // illusions: {
  //   subjectName: 'Iluzije',
  //   subjectImage: require('../assets/subjectImages/illusions.png'),
  //   cardColor: '#fff',
  //   cardBgColor: '#fff',
  //   themeColor: '#FE9738',
  //   bgColor: null,
  //   subjectId: 'illusions',
  // },
  mycology: {
    subjectName: 'Mikologija',
    subjectImage: require('../assets/subjectImages/mycology.png'),
    cardColor: '#fff',
    cardBgColor: '#fff',
    themeColor: '#C9A976',
    bgColor: 'white',
    subjectId: 'mycology',
  },
  microbiology: {
    subjectName: 'Mikrobiologija',
    subjectImage: require('../assets/subjectImages/microbiology.png'),
    cardColor: '#fff',
    cardBgColor: '#fff',
    themeColor: '#8379C1',
    bgColor: '#F0DCF3',
    subjectId: 'microbiology',
  },
  zoology: {
    subjectName: 'Zoologija',
    subjectImage: require('../assets/subjectImages/zoology.png'),
    cardColor: '#fff',
    cardBgColor: '#fff',
    themeColor: '#603F42',
    bgColor: null,
    subjectId: 'zoology',
  },
};

//https://stackoverflow.com/questions/46153975/using-flat-list-with-objectmap
