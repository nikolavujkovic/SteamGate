export default {
  anatomy: [
    {
      modelTitle: 'Srce',
      modelLogo: require('../assets/modelImages/anatomy/heartL.png'),
      modelImage: require('../assets/modelPreviews/anatomy/heartP.png'),
      modelType: 'GLTF',
      modelScale: 0.5,
      shadowVisible: false,
      onGround: false,
      modelSource: require('../models/anatomy/srce/srce.gltf'),
      modelResourcesArr: [require('../models/anatomy/srce/srce.bin')],
    },
    {
      modelTitle: 'Bubreg',
      modelLogo: require('../assets/modelImages/anatomy/kidneyL.png'),
      modelImage: require('../assets/modelPreviews/anatomy/kidneyP.png'),
      modelType: 'GLTF',
      modelScale: 0.5,
      shadowVisible: false,
      onGround: false,
      modelSource: require('../models/anatomy/bubreg/bubreg.gltf'),
      modelResourcesArr: [require('../models/anatomy/bubreg/bubreg.bin')],
    },
    {
      modelTitle: 'Jetra',
      modelLogo: require('../assets/modelImages/anatomy/liverL.png'),
      modelImage: require('../assets/modelPreviews/anatomy/liverP.png'),
      modelType: 'GLTF',
      modelScale: 0.5,
      shadowVisible: false,
      onGround: false,
      modelSource: require('../models/anatomy/jetra/jetra.gltf'),
      modelResourcesArr: [
        require('../models/anatomy/jetra/jetra.bin'),
        require('../models/anatomy/jetra/Material_baseColor.png'),
        require('../models/anatomy/jetra/Material_metallicRoughness.png'),
        require('../models/anatomy/jetra/Material_normal.png'),
        require('../models/anatomy/jetra/Material.011_normal.png'),
        require('../models/anatomy/jetra/Material.011_baseColor.png'),
        require('../models/anatomy/jetra/Material.012_normal.png'),
        require('../models/anatomy/jetra/Material.012_baseColor.png'),
        require('../models/anatomy/jetra/Material.012_metallicRoughness.png'),
        require('../models/anatomy/jetra/Material.013_normal.png'),
        require('../models/anatomy/jetra/Material.013_baseColor.png'),
        require('../models/anatomy/jetra/Material.013_metallicRoughness.png'),
        require('../models/anatomy/jetra/Material.015_normal.png'),
        require('../models/anatomy/jetra/Material.015_baseColor.png'),
        require('../models/anatomy/jetra/Material.015_metallicRoughness.png'),
      ],
    },
    {
      modelTitle: 'Hemisfera mozga',
      modelLogo: require('../assets/modelImages/anatomy/lungsL.png'),
      modelImage: require('../assets/modelPreviews/anatomy/lungsP.png'),
      modelType: 'GLTF',
      modelScale: 0.002,
      shadowVisible: false,
      onGround: false,
      modelSource: require('../models/anatomy/pluca/pluca.gltf'),
      modelResourcesArr: [require('../models/anatomy/pluca/pluca.bin')],
    },
  ],
  // astronomy: [
  //   {
  //     modelTitle: 'Zemlja',
  //     modelLogo: require('../assets/modelImages/astronomy/earthL.png'),
  //     modelImage: require('../assets/modelPreviews/astronomy/earthP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/astronomy/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/astronomy/NAMEB.bin'),
  //       require('../models/astronomy/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Mars',
  //     modelLogo: require('../assets/modelImages/astronomy/marsL.png'),
  //     modelImage: require('../assets/modelPreviews/astronomy/marsP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/astronomy/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/astronomy/NAMEB.bin'),
  //       require('../models/astronomy/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Mjesec',
  //     modelLogo: require('../assets/modelImages/astronomy/moonL.png'),
  //     modelImage: require('../assets/modelPreviews/astronomy/moonP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/astronomy/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/astronomy/NAMEB.bin'),
  //       require('../models/astronomy/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Sputnjik 1',
  //     modelLogo: require('../assets/modelImages/astronomy/sputnik1L.png'),
  //     modelImage: require('../assets/modelPreviews/astronomy/sputnik1P.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/astronomy/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/astronomy/NAMEB.bin'),
  //       require('../models/astronomy/NAMEC.png'),
  //     ],
  //   },
  // ],
  // botany: [
  //   {
  //     modelTitle: 'Anturijum',
  //     modelLogo: require('../assets/modelImages/botany/anturijumL.png'),
  //     modelImage: require('../assets/modelPreviews/botany/anturijumP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/botany/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/botany/NAMEB.bin'),
  //       require('../models/botany/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Dimak',
  //     modelLogo: require('../assets/modelImages/botany/dimakL.png'),
  //     modelImage: require('../assets/modelPreviews/botany/dimakP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/botany/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/botany/NAMEB.bin'),
  //       require('../models/botany/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Paprat',
  //     modelLogo: require('../assets/modelImages/botany/papratL.png'),
  //     modelImage: require('../assets/modelPreviews/botany/papratP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/botany/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/botany/NAMEB.bin'),
  //       require('../models/botany/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Tratinčica',
  //     modelLogo: require('../assets/modelImages/botany/tratincicaL.png'),
  //     modelImage: require('../assets/modelPreviews/botany/tratincicaP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/botany/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/botany/NAMEB.bin'),
  //       require('../models/botany/NAMEC.png'),
  //     ],
  //   },
  // ],
  // electronics: [
  //   {
  //     modelTitle: 'Matična ploča',
  //     modelLogo: require('../assets/modelImages/electronics/motherboardL.png'),
  //     modelImage: require('../assets/modelPreviews/electronics/motherboardP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/electronics/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/electronics/NAMEB.bin'),
  //       require('../models/electronics/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Procesor',
  //     modelLogo: require('../assets/modelImages/electronics/processorL.png'),
  //     modelImage: require('../assets/modelPreviews/electronics/processorP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/electronics/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/electronics/NAMEB.bin'),
  //       require('../models/electronics/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'RAM',
  //     modelLogo: require('../assets/modelImages/electronics/ramL.png'),
  //     modelImage: require('../assets/modelPreviews/electronics/ramP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/electronics/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/electronics/NAMEB.bin'),
  //       require('../models/electronics/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Tranzistor',
  //     modelLogo: require('../assets/modelImages/electronics/transistorL.png'),
  //     modelImage: require('../assets/modelPreviews/electronics/transistorP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/electronics/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/electronics/NAMEB.bin'),
  //       require('../models/electronics/NAMEC.png'),
  //     ],
  //   },
  // ],
  // chemistry: [
  //   {
  //     modelTitle: 'Ugljen-dioksid',
  //     modelLogo: require('../assets/modelImages/chemistry/carbon_dioxideL.png'),
  //     modelImage: require('../assets/modelPreviews/chemistry/carbon_dioxideP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/chemistry/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/chemistry/NAMEB.bin'),
  //       require('../models/chemistry/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Glukoza',
  //     modelLogo: require('../assets/modelImages/chemistry/glucosaL.png'),
  //     modelImage: require('../assets/modelPreviews/chemistry/glucosaP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/chemistry/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/chemistry/NAMEB.bin'),
  //       require('../models/chemistry/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Mliječna kiselina',
  //     modelLogo: require('../assets/modelImages/chemistry/milk_acidL.png'),
  //     modelImage: require('../assets/modelPreviews/chemistry/milk_acidP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/chemistry/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/chemistry/NAMEB.bin'),
  //       require('../models/chemistry/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Voda',
  //     modelLogo: require('../assets/modelImages/chemistry/waterL.png'),
  //     modelImage: require('../assets/modelPreviews/chemistry/waterP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/chemistry/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/chemistry/NAMEB.bin'),
  //       require('../models/chemistry/NAMEC.png'),
  //     ],
  //   },
  // ],
  // // illusions: [
  // //   {
  // //     modelTitle: 'srce',
  // //     modelLogo: require('../assets/modelImages/illusions/heartL.png'),
  // //     modelImage: require('../assets/modelPreviews/illusions/heartP.png'),
  // //     modelType: 'GLTF',
  // //     modelScale: 0.5,
  // //     shadowVisible: false,
  // //     onGround: false,
  // //     modelSource: require('../models/illusions/NAME.gltf'),
  // //     modelResourcesArr: [
  // //      require(''),
  // //      require('')
  // //     ]
  // //   },
  // //   {
  // //     modelTitle: 'bubreg',
  // //     modelLogo: require('../assets/modelImages/illusions/kidneyL.png'),
  // //     modelImage: require('../assets/modelPreviews/illusions/kidneyP.png'),
  // //     modelType: 'GLTF',
  // //     modelScale: 0.5,
  // //     shadowVisible: false,
  // //     onGround: false,
  // //     modelSource: require('../models/illusions/NAME.gltf'),
  // //     modelResourcesArr: [
  // //      require(''),
  // //      require('')
  // //     ]
  // //   },
  // //   {
  // //     modelTitle: 'jetra',
  // //     modelLogo: require('../assets/modelImages/illusions/liverL.png'),
  // //     modelImage: require('../assets/modelPreviews/illusions/liverP.png'),
  // //     modelType: 'GLTF',
  // //     modelScale: 0.5,
  // //     shadowVisible: false,
  // //     onGround: false,
  // //     modelSource: require('../models/illusions/NAME.gltf'),
  // //     modelResourcesArr: [
  // //      require(''),
  // //      require('')
  // //     ]
  // //   },
  // //   {
  // //     modelTitle: 'pluća',
  // //     modelLogo: require('../assets/modelImages/illusions/lungsL.png'),
  // //     modelImage: require('../assets/modelPreviews/illusions/lungsP.png'),
  // //     modelType: 'GLTF',
  // //     modelScale: 0.5,
  // //     shadowVisible: false,
  // //     onGround: false,
  // //     modelSource: require('../models/illusions/NAME.gltf'),
  // //     modelResourcesArr: [
  // //      require(''),
  // //      require('')
  // //     ]
  // //   },
  // // ],
  // mycology: [
  //   {
  //     modelTitle: 'Brazovded',
  //     modelLogo: require('../assets/modelImages/mycology/brazovdedL.png'),
  //     modelImage: require('../assets/modelPreviews/mycology/brazovdedP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/mycology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/mycology/NAMEB.bin'),
  //       require('../models/mycology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Muhara',
  //     modelLogo: require('../assets/modelImages/mycology/muharaL.png'),
  //     modelImage: require('../assets/modelPreviews/mycology/muharaP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/mycology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/mycology/NAMEB.bin'),
  //       require('../models/mycology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Šitake',
  //     modelLogo: require('../assets/modelImages/mycology/sitakeL.png'),
  //     modelImage: require('../assets/modelPreviews/mycology/sitakeP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/mycology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/mycology/NAMEB.bin'),
  //       require('../models/mycology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Sunčanica',
  //     modelLogo: require('../assets/modelImages/mycology/suncanicaL.png'),
  //     modelImage: require('../assets/modelPreviews/mycology/suncanicaP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/mycology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/mycology/NAMEB.bin'),
  //       require('../models/mycology/NAMEC.png'),
  //     ],
  //   },
  // ],
  // microbiology: [
  //   {
  //     modelTitle: 'Ćelija',
  //     modelLogo: require('../assets/modelImages/microbiology/cellL.png'),
  //     modelImage: require('../assets/modelPreviews/microbiology/cellP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/microbiology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/microbiology/NAMEB.bin'),
  //       require('../models/microbiology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Covid-19',
  //     modelLogo: require('../assets/modelImages/microbiology/coronaL.png'),
  //     modelImage: require('../assets/modelPreviews/microbiology/coronaP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/microbiology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/microbiology/NAMEB.bin'),
  //       require('../models/microbiology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Hepatitis',
  //     modelLogo: require('../assets/modelImages/microbiology/hepatitisL.png'),
  //     modelImage: require('../assets/modelPreviews/microbiology/hepatitisP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/microbiology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/microbiology/NAMEB.bin'),
  //       require('../models/microbiology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Koža',
  //     modelLogo: require('../assets/modelImages/microbiology/skinL.png'),
  //     modelImage: require('../assets/modelPreviews/microbiology/skinP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/microbiology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/microbiology/NAMEB.bin'),
  //       require('../models/microbiology/NAMEC.png'),
  //     ],
  //   },
  // ],
  // zoology: [
  //   {
  //     modelTitle: 'Komarac',
  //     modelLogo: require('../assets/modelImages/zoology/mosquitoL.png'),
  //     modelImage: require('../assets/modelPreviews/zoology/mosquitoP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/zoology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/zoology/NAMEB.bin'),
  //       require('../models/zoology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Pčela',
  //     modelLogo: require('../assets/modelImages/zoology/beeL.png'),
  //     modelImage: require('../assets/modelPreviews/zoology/beeP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/zoology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/zoology/NAMEB.bin'),
  //       require('../models/zoology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Kornjača',
  //     modelLogo: require('../assets/modelImages/zoology/turtleL.png'),
  //     modelImage: require('../assets/modelPreviews/zoology/turtleP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/zoology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/zoology/NAMEB.bin'),
  //       require('../models/zoology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Lav',
  //     modelLogo: require('../assets/modelImages/zoology/lionL.png'),
  //     modelImage: require('../assets/modelPreviews/zoology/lionP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/zoology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/zoology/NAMEB.bin'),
  //       require('../models/zoology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Paun',
  //     modelLogo: require('../assets/modelImages/zoology/peacockL.png'),
  //     modelImage: require('../assets/modelPreviews/zoology/peacockP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/zoology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/zoology/NAMEB.bin'),
  //       require('../models/zoology/NAMEC.png'),
  //     ],
  //   },
  //   {
  //     modelTitle: 'Puž',
  //     modelLogo: require('../assets/modelImages/zoology/snailL.png'),
  //     modelImage: require('../assets/modelPreviews/zoology/snailP.png'),
  //     modelType: 'GLTF',
  //     modelScale: 0.5,
  //     shadowVisible: false,
  //     onGround: false,
  //     modelSource: require('../models/zoology/NAME.gltf'),
  //     modelResourcesArr: [
  //       require('../models/zoology/NAMEB.bin'),
  //       require('../models/zoology/NAMEC.png'),
  //     ],
  //   },
  // ],
};

// How to turn a list of object properties into an array
// https://stackoverflow.com/questions/46153975/using-flat-list-with-objectmap